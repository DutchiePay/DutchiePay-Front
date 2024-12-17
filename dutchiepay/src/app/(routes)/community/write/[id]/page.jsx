'use client';

import { useEffect, useState } from 'react';

import { ALL_COMMUNITY_CATEGORIES } from '@/app/_util/constants';
import FreePostForm from '@/app/_components/_community/_free/FreePostForm';
import axios from 'axios';
import getTextLength from '@/app/_util/getTextLength';
import useFetchUpdatePostData from '@/app/hooks/useFetchUpdatePostData';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function MartModify() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [post, setPost] = useState(null);
  const { refreshAccessToken } = useReissueToken();
  useFetchUpdatePostData({ id, setPost });

  const { register, watch, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const handleSetValue = () => {
      setEditorContent(JSON.parse(post.content));
      setValue('title', post.title);
      setValue(
        'category',
        Object.keys(ALL_COMMUNITY_CATEGORIES).find(
          (key) => ALL_COMMUNITY_CATEGORIES[key] === post.category
        )
      );
      setThumbnail(post.thumbnail);
      setImages(post.images);
    };

    if (post) handleSetValue();
  }, [post, setValue]);

  const onSubmit = async (formData) => {
    if (!formData.title || formData.title.length > 60) {
      alert('제목이 입력되지 않았거나 60자를 초과하였습니다.');
      return;
    }

    const length = getTextLength(editorContent);
    if (length > 3000) {
      alert(
        `게시글의 내용은 3,000자 이내로 작성해주세요.\n현재 글자수는 ${length.toLocaleString()}자 입니다.`
      );
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/free`,
        {
          freeId: id,
          title: formData.title,
          content: JSON.stringify(editorContent),
          thumbnail: thumbnail,
          images: images,
          category: ALL_COMMUNITY_CATEGORIES[formData.category],
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      alert('정상적으로 수정되었습니다.');

      router.push(`/community/${id}`);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await onSubmit(formData);
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다 다시 시도해주세요.'
          );
        }
      } else {
        alert(
          error.response.data.message ||
            '오류가 발생했습니다 다시 시도해주세요.'
        );
      }
    }
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[40px] mx-[60px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FreePostForm
          register={register}
          setValue={setValue}
          watch={watch}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          setThumbnail={setThumbnail}
          thumbnail={thumbnail}
          images={images}
          setImages={setImages}
        />
      </form>
    </section>
  );
}

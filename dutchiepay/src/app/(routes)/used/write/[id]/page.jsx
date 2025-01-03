'use client';

import { useEffect, useState } from 'react';

import { ALL_COMMUNITY_CATEGORIES } from '@/app/_util/constants';
import LocationModal from '@/app/_components/_community/_local/LocationModal';
import TradePostForm from '@/app/_components/_community/_local/TradePostForm';
import axios from 'axios';
import getTextLength from '@/app/_util/getTextLength';
import useFetchUpdatePostData from '@/app/hooks/useFetchUpdatePostData';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function TradeModify() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [post, setPost] = useState(null);
  useFetchUpdatePostData({ id, setPost, menu: 'trading' });

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: { lat: null, lng: null },
    },
  });

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
      setValue('locationDescription', post.meetingPlace);
      setValue('location', { lat: post.latitude, lng: post.longitude });
      setThumbnail(post.thumbnail);
      setImages(post.images);
      setValue('goods', post.goods);
      setValue('price', post.price);
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/trading`,
        {
          purchaseId: id,
          title: formData.title,
          meetingPlace: formData.locationDescription,
          latitude: formData.location.lat,
          longitude: formData.location.lng,
          content: JSON.stringify(editorContent),
          thumbnail: thumbnail,
          images: images,
          category: ALL_COMMUNITY_CATEGORIES[formData.category],
          goods: formData.goods,
          price: Number(formData.price.replaceAll(',', '')),
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      router.push(`/used/${id}`);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[40px] mx-[60px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TradePostForm
          setIsModalOpen={setIsModalOpen}
          register={register}
          setValue={setValue}
          watch={watch}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          thumbnail={thumbnail}
          images={images}
          setImages={setImages}
          setThumbnail={setThumbnail}
        />
      </form>
      {isModalOpen && (
        <LocationModal
          setIsModalOpen={setIsModalOpen}
          register={register}
          setValue={setValue}
          watch={watch}
        />
      )}
    </section>
  );
}

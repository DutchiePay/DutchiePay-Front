'use client';

import { ALL_COMMUNITY_CATEGORIES } from '@/app/_util/constants';
import LocationModal from '@/app/_components/_community/_local/LocationModal';
import MartPostForm from '@/app/_components/_community/_local/MartPostForm';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import axios from 'axios';
import getTextLength from '@/app/_util/getTextLength';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function MartWrite() {
  const access = useSelector((state) => state.login.access);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      headCount: 2,
      category: '마트',
      location: { lat: null, lng: null },
    },
  });

  const onSubmit = async (formData) => {
    if (!formData.title || formData.title.length > 60) {
      alert('제목이 입력되지 않았거나 60자를 초과하였습니다.');
      return;
    }

    if (!formData.formattedDateTime) {
      alert('날짜와 시간을 모두 입력해주세요.');
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mart`,
        {
          title: formData.title,
          date: formData.formattedDateTime,
          maximum: formData.headCount,
          meetingPlace: formData.locationDescription,
          latitude: formData.location.lat,
          longitude: formData.location.lng,
          content: JSON.stringify(editorContent),
          thumbnail: thumbnail || null,
          images: images,
          category: ALL_COMMUNITY_CATEGORIES[formData.category],
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      router.push(`/mart/${response.data.shareId}`);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ProtectedRoute>
      <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[40px] mx-[60px] relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <MartPostForm
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
            isUpdate={false}
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
    </ProtectedRoute>
  );
}

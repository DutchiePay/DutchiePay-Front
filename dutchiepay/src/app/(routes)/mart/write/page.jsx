'use client';

import '@/styles/community.css';

import { COMMMUNITY_CATEGORIES } from '@/app/_util/constants';
import CommunityFilter from '@/app/_components/_community/_post/CommunityFilter';
import DateInput from '@/app/_components/_community/_post/DateInput';
import HeadCount from '@/app/_components/_community/_post/HeadCount';
import Location_Modal from '@/app/_components/_community/_post/LocationModal';
import MettingPlaceInput from '@/app/_components/_community/_post/MeetingPlaceInput';
import PostWritingAction from '@/app/_components/_community/_post/PostWritingAction';
import TextEditor from '@/app/_components/_community/_post/TextEditor';
import TitleInput from '@/app/_components/_community/_post/TitleInput';
import axios from 'axios';
import getTextLength from '@/app/_util/getTextLength';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function MartWrite() {
  const access = useSelector((state) => state.login.access);
  const [filter, setFilter] = useState('마트');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationDescription, setLocationDescription] = useState('');
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const router = useRouter();

  const { register, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      headCount: 2,
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
          meetingPlace: locationDescription,
          latitude: location.lat,
          longitude: location.lng,
          content: JSON.stringify(editorContent),
          thumbnail: thumbnail,
          images: images,
          category: COMMMUNITY_CATEGORIES[filter],
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      router.push(`/mart/${response.data.sharedId}`);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[40px] mx-[60px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommunityFilter
          categories={['마트', '배달']}
          filter={filter}
          setFilter={setFilter}
        />
        <TitleInput register={register} />
        <DateInput register={register} setValue={setValue} />
        <MettingPlaceInput
          setIsModalOpen={setIsModalOpen}
          locationDescription={locationDescription}
        />
        <HeadCount register={register} setValue={setValue} watch={watch} />
        <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
          <label className="font-bold text-lg" htmlFor="content">
            내용
          </label>
          <small className="text-sm text-gray--500">
            추가적인 설명이 필요하신 경우 작성해주세요. 최대 3,000글자까지 입력
            가능합니다.
          </small>
        </div>
        <TextEditor
          setEditorContent={setEditorContent}
          thumbnail={thumbnail}
          images={images}
          setThumbnail={setThumbnail}
          setImages={setImages}
        />
        <PostWritingAction />
      </form>
      {isModalOpen && (
        <Location_Modal
          setIsModalOpen={setIsModalOpen}
          locationDescription={locationDescription}
          setLocationDescription={setLocationDescription}
          setLocation={setLocation}
          location={location}
        />
      )}
    </section>
  );
}

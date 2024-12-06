'use client';

import '@/styles/community.css';

import CommunityFilter from '@/app/_components/_community/_post/CommunityFilter';
import DateInput from '@/app/_components/_community/_post/DateInput';
import HeadCount from '@/app/_components/_community/_post/HeadCount';
import Location_Modal from '@/app/_components/_community/_post/LocationModal';
import MettingPlaceInput from '@/app/_components/_community/_post/MeetingPlaceInput';
import PostWritingAction from '@/app/_components/_community/_post/PostWritingAction';
import TextEditor from '@/app/_components/_community/_post/TextEditor';
import TitleInput from '@/app/_components/_community/_post/TitleInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function MartWrite() {
  const [filter, setFilter] = useState('마트');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [editorContent, setEditorContent] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationDescription, setLocationDescription] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      headCount: 2,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    console.log(editorContent);
    console.log(location);
    console.log(locationDescription);
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
        <TextEditor setEditorContent={setEditorContent} />
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

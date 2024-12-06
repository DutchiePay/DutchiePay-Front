'use client';

import '@/styles/community.css';

import CommunityFilter from '@/app/_components/_community/_post/CommunityFilter';
import DateInput from '@/app/_components/_community/_post/DateInput';
import HeadCount from '@/app/_components/_community/_post/HeadCount';
import Location_Modal from '@/app/(routes)/location/page';
import MettingPlaceInput from '@/app/_components/_community/_post/MeetingPlaceInput';
import PostWritingAction from '@/app/_components/_community/_post/PostWritingAction';
import TextEditor from '@/app/_components/_community/_post/TextEditor';
import TitleInput from '@/app/_components/_community/_post/TitleInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function MartWrite() {
  const [filter, setFilter] = useState('마트');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationDescription, setLocationDescription] = useState('');
  const [editorContent, setEditorContent] = useState('');
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

  const handleLocationUpdate = (description) => {
    console.log(locationDescription);

    setLocationDescription(description);
    setIsModalOpen(false);
  };

  const onSubmit = async (formData) => {
    console.log(formData);
    console.log(editorContent);
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[40px] mx-[60px]">
      {isModalOpen ? (
        <Location_Modal onLocationUpdate={handleLocationUpdate} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommunityFilter
            categories={['마트', '배달']}
            filter={filter}
            setFilter={setFilter}
          />
          <TitleInput register={register} />
          <DateInput register={register} setValue={setValue} />
          <MettingPlaceInput />
          <HeadCount register={register} setValue={setValue} watch={watch} />
          <TextEditor setEditorContent={setEditorContent} />
          <PostWritingAction menu={'mart'} />
        </form>
      )}
    </section>
  );
}

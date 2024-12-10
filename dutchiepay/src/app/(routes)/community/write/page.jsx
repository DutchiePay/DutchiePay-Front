'use client';

import CommunityFilter from '@/app/_components/_community/_common/CommunityFilter';
import PostWritingAction from '@/app/_components/_community/_common/PostWritingAction';
import TextEditor from '@/app/_components/_community/_common/TextEditor';
import TitleInput from '@/app/_components/_community/_common/TitleInput';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function CommunityWrite() {
  const [filter, setFilter] = useState('정보');
  const [editorContent, setEditorContent] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      headCount: 2,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    console.log(editorContent);
  };

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <section className="mt-[60px] mx-[60px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CommunityFilter
            categories={['정보', '질문', '취미', '자유']}
            filter={filter}
            setFilter={setFilter}
          />
          <TitleInput register={register} />
          <TextEditor setEditorContent={setEditorContent} />
          <PostWritingAction menu={'mart'} />
        </form>
      </section>
    </main>
  );
}

'use client';

import '@/styles/community.css';

import Post_Used from '@/app/_components/_community/Post_Used';
import { useRouter } from 'next/navigation';

export default function Used() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/used/write');
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-end">
        <button
          className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
          onClick={handleButtonClick}
        >
          게시글 작성
        </button>
      </div>
      <section
        className="mt-[16px] flex flex-wrap gap-[20px]"
        aria-label="게시글 목록"
      >
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
        <Post_Used />
      </section>
    </section>
  );
}

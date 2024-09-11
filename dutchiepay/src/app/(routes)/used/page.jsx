'use client';

import '@/styles/community.css';

import Image from 'next/image';
import Post_Used from '@/app/_components/_community/Post_Used';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Used() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/used/write');
  };

  const [filter, setFilter] = useState('전체');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between">
        <nav aria-label="필터링">
          <ul className="flex gap-[12px]">
            <li
              role="button"
              tabindex="0"
              className={`community__filter ${filter === '전체' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('전체')}
            >
              전체
            </li>
            <li
              role="button"
              tabindex="0"
              className={`community__filter ${filter === '나눔' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('나눔')}
            >
              나눔
            </li>
            <li
              role="button"
              tabindex="0"
              className={`community__filter ${filter === '거래' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('거래')}
            >
              거래
            </li>
          </ul>
        </nav>

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

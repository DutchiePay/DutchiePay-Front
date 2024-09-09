'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Post_Community from '@/app/_components/_community/Post_Community';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Community() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/community/write');
  };

  const [filter, setFilter] = useState('최신순');
  const [category, setCategory] = useState('전체');

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between items-end">
        <ul className="flex gap-[12px]">
          <li
            className={`community__filter ${category === '전체' ? `community__filter--selected` : ''}`}
            onClick={(e) => setCategory(e.target.innerText)}
          >
            전체
          </li>
          <li
            className={`community__filter ${category === '정보' ? `community__filter--selected` : ''}`}
            onClick={(e) => setCategory(e.target.innerText)}
          >
            정보
          </li>
          <li
            className={`community__filter ${category === '질문' ? `community__filter--selected` : ''}`}
            onClick={(e) => setCategory(e.target.innerText)}
          >
            질문
          </li>
          <li
            className={`community__filter ${category === '취미' ? `community__filter--selected` : ''}`}
            onClick={(e) => setCategory(e.target.innerText)}
          >
            취미
          </li>
          <li
            className={`community__filter ${category === '자유' ? `community__filter--selected` : ''}`}
            onClick={(e) => setCategory(e.target.innerText)}
          >
            자유
          </li>
        </ul>
        <div className="flex items-end gap-[24px]">
          <ul className="flex">
            <li
              className={`fillter__item ${filter === '최신순' && 'fillter__item--selected'}`}
              onClick={(e) => setFilter(e.target.innerText)}
            >
              최신순
            </li>
            <li
              className={`fillter__item ${filter === '댓글많은순' && 'fillter__item--selected'}`}
              onClick={(e) => setFilter(e.target.innerText)}
            >
              댓글많은순
            </li>
            <li
              className={`fillter__item ${filter === '조회수순' && 'fillter__item--selected'}`}
              onClick={(e) => setFilter(e.target.innerText)}
            >
              조회수순
            </li>
          </ul>
          <button
            className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
            onClick={handleButtonClick}
          >
            게시글 작성
          </button>
        </div>
      </div>
      <section className="mt-[16px] flex flex-wrap gap-[20px] ">
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
        <Post_Community />
      </section>
    </main>
  );
}

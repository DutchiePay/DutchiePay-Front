'use client';

import '@/styles/community.css';

import Image from 'next/image';
import Post_Mart from '@/app/_components/Post_Mart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Mart() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/mart/write');
  };

  const [filter, setFilter] = useState('전체');

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between">
        <ul className="flex gap-[12px]">
          <li
            className={`community__filter ${filter === '전체' ? `community__filter--selected` : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            전체
          </li>
          <li
            className={`community__filter ${filter === '마트' ? `community__filter--selected` : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            마트
          </li>
          <li
            className={`community__filter ${filter === '배달' ? `community__filter--selected` : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            배달
          </li>
        </ul>
        <button className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm" onClick={handleButtonClick}>
          게시글 작성
        </button>
      </div>
      <section className="mt-[16px] flex flex-wrap gap-[20px]">
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
        <Post_Mart />
      </section>
    </main>
  );
}

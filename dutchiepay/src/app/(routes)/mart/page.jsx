'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Post_Mart from '@/app/_components/_community/Post_Mart';
import { useState } from 'react';

export default function Mart() {
  const [filter, setFilter] = useState('전체');

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between">
        <ul className="flex gap-[12px]">
          <li>
            <button
              className={`community__filter ${filter === '전체' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('전체')}
            >
              전체
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${filter === '마트' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('마트')}
            >
              마트
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${filter === '배달' ? `community__filter--selected` : ''}`}
              onClick={() => setFilter('배달')}
            >
              배달
            </button>
          </li>
        </ul>
        <Link
          href="/mart/write"
          className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
          role="button"
        >
          게시글 작성
        </Link>
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

'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Post from '@/app/_components/Post';
import { useState } from 'react';

// 작성 게시글 없을 때 UI도 구현해야 함
export default function MyPost() {
  const [filter, setFilter] = useState('작성한 게시글');

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">활동내역</h1>
      <ul className="flex gap-[8px] my-[16px]">
        <li>
          <button
            className={`mypage__filter ${filter === '작성한 게시글' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('작성한 게시글')}
          >
            작성한 게시글
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '댓글 남긴 게시글' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('댓글 남긴 게시글')}
          >
            댓글 남긴 게시글
          </button>
        </li>
      </ul>
      <section className="flex flex-wrap gap-[12px]">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
    </section>
  );
}

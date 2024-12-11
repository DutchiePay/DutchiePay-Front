'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Link from 'next/link';
import Post_Community from '@/app/_components/_community/Post_Community';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Community() {
  const access = useSelector((state) => state.login.access);
  const [filter, setFilter] = useState('최신순');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-end items-end">
        <div className="flex items-end gap-[24px]">
          <ul className="flex">
            <li
              className={`fillter__item ${filter === '최신순' && 'fillter__item--selected'}`}
              onClick={() => setFilter('최신순')}
            >
              최신순
            </li>
            <li
              className={`fillter__item ${filter === '댓글많은순' && 'fillter__item--selected'}`}
              onClick={() => setFilter('댓글많은순')}
            >
              댓글많은순
            </li>
            <li
              className={`fillter__item ${filter === '조회수순' && 'fillter__item--selected'}`}
              onClick={() => setFilter('조회수순')}
            >
              조회수순
            </li>
          </ul>
          <Link
            href={`${access ? '/mart/write' : '/login'}`}
            className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
            role="button"
          >
            게시글 작성
          </Link>
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
    </section>
  );
}

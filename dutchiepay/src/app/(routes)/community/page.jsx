'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Post_Community from '@/app/_components/_community/Post_Community';
import { useState } from 'react';

export default function Community() {
  const [filter, setFilter] = useState('최신순');
  const [category, setCategory] = useState('전체');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between items-end">
        <ul className="flex gap-[12px]">
          <li>
            <button
              className={`community__filter ${category === '전체' ? `community__filter--selected` : ''}`}
              onClick={() => setCategory('전체')}
            >
              전체
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${category === '정보' ? `community__filter--selected` : ''}`}
              onClick={() => setCategory('정보')}
            >
              정보
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${category === '질문' ? `community__filter--selected` : ''}`}
              onClick={() => setCategory('질문')}
            >
              질문
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${category === '취미' ? `community__filter--selected` : ''}`}
              onClick={() => setCategory('취미')}
            >
              취미
            </button>
          </li>
          <li>
            <button
              className={`community__filter ${category === '자유' ? `community__filter--selected` : ''}`}
              onClick={() => setCategory('자유')}
            >
              자유
            </button>
          </li>
        </ul>

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
            href="/community/write"
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

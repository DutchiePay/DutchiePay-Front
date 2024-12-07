'use client';

import '@/styles/community.css';

import Image from 'next/image';
import Link from 'next/link';
import TextEditor from '@/app/_components/_community/_post/TextEditor';
import { useState } from 'react';

export default function CommunityWrite() {
  const [filter, setFilter] = useState('정보');

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <section className="mt-[60px] mx-[60px]">
        <form>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">카테고리</label>
            <p className="community__label-description">
              작성하실 게시글의 카테고리를 선택해주세요.
            </p>
          </div>
          <ul className="flex gap-[16px]">
            <li>
              <button
                className={`community__filter ${filter === '정보' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('정보')}
                type="button"
              >
                정보
              </button>
            </li>
            <li>
              <button
                className={`community__filter ${filter === '질문' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('질문')}
                type="button"
              >
                질문
              </button>
            </li>
            <li>
              <button
                className={`community__filter ${filter === '취미' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('취미')}
                type="button"
              >
                취미
              </button>
            </li>
            <li>
              <button
                className={`community__filter ${filter === '자유' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('자유')}
                type="button"
              >
                자유
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="title">
              제목
            </label>
            <small className="community__label-description">
              게시글 제목을 입력해주세요. 최대 60글자까지 입력 가능합니다.
            </small>
          </div>
          <input
            id="title"
            className="community__input-text"
            type="text"
            placeholder="게시글 제목"
            aria-required="true"
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="content">
              내용
            </label>
            <small className="community__label-description">
              최대 3,000글자까지 입력 가능합니다.
            </small>
          </div>
          <TextEditor />
          <div className="flex justify-center gap-[16px] mt-[48px]">
            <button
              className="bg-blue--500 text-white text-lg font-semibold rounded-lg px-[60px] py-[8px]"
              type="submit"
            >
              등록
            </button>
            <Link
              href="/community"
              className="border border-blue--500 text-blue--500 text-lg font-semibold rounded-lg px-[60px] py-[6px]"
              role="button"
            >
              취소
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

'use client';

import '@/styles/community.css';

import Image from 'next/image';
import TextEditor from '@/app/_components/_community/TextEditor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CommunityWrite() {
  const [filter, setFilter] = useState('정보');
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();

  const handleCancelButtonClick = (e) => {
    e.preventDefault();
    router.push('/community');
  };

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

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
            <li
              className={`community__filter ${filter === '정보' ? `community__filter--selected` : ''}`}
              onClick={(e) => handleFilter(e)}
            >
              정보
            </li>
            <li
              className={`community__filter ${filter === '질문' ? `community__filter--selected` : ''}`}
              onClick={(e) => handleFilter(e)}
            >
              질문
            </li>
            <li
              className={`community__filter ${filter === '취미' ? `community__filter--selected` : ''}`}
              onClick={(e) => handleFilter(e)}
            >
              취미
            </li>
            <li
              className={`community__filter ${filter === '자유' ? `community__filter--selected` : ''}`}
              onClick={(e) => handleFilter(e)}
            >
              자유
            </li>
          </ul>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">제목</label>
            <p className="community__label-description">
              게시글 제목을 입력해주세요. 최대 60글자까지 입력 가능합니다.
            </p>
          </div>
          <input
            className="community__input-text"
            type="text"
            placeholder="게시글 제목"
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">내용</label>
            <p className="community__label-description">
              최대 3,000글자까지 입력 가능합니다.
            </p>
          </div>
          <TextEditor />
          <div className="flex justify-center gap-[16px] mt-[80px]">
            <button
              className="bg-blue--500 text-white text-lg font-semibold rounded-lg px-[60px] py-[8px]"
              type="submit"
            >
              등록
            </button>
            <button
              className="border border-blue--500 text-blue--500 text-lg font-semibold rounded-lg px-[60px] py-[8px]"
              type="submit"
              onClick={handleCancelButtonClick}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

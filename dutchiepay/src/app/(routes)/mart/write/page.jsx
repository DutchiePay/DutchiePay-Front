'use client';

import '@/styles/community.css';
import 'react-quill/dist/quill.snow.css';

import Image from 'next/image';
import ReactQuill from 'react-quill';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MartWrite() {
  const [filter, setFilter] = useState('마트');
  const [editorContent, setEditorContent] = useState('');
  const [headcount, setHeadcount] = useState(1);
  const router = useRouter();

  const handleCancelButtonClick = (e) => {
    e.preventDefault();
    router.push('/mart');
  };

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

  const handleHeadcount = (e) => {
    e.preventDefault();
    if (e.target.value === '-') {
      if (headcount === 1) return;
      setHeadcount(headcount - 1);
    } else {
      setHeadcount(headcount + 1);
    }
  };

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <section className="mt-[60px] mx-[60px]">
        <form>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">카테고리</label>
            <p className="community__label-description">작성하실 게시글의 카테고리를 선택해주세요.</p>
          </div>
          <ul className="flex gap-[16px]">
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
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">제목</label>
            <p className="community__label-description">게시글 제목을 입력해주세요. 최대 60글자까지 입력 가능합니다.</p>
          </div>
          <input className="community__input-text" type="text" placeholder="게시글 제목" />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">일시</label>
            <p className="community__label-description">마트/배달을 희망하는 날짜와 시간을 입력해주세요.</p>
          </div>
          <div className="flex gap-[8px]">
            <input className="community__input-date" type="date" />
            <input className="community__input-date" type="time" />
          </div>
          <label className="community__label block mt-[24px] mb-[8px]">장소</label>
          <input className="community__input-text" type="text" disabled="true" />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">최대 인원 수</label>
            <p className="community__label-description">마트/배달을 함께 할 최대 인원 수를 입력해주세요.</p>
          </div>
          <div className="w-full flex items-center gap-[4px] mb-[12px]">
            <button className="community__button-number" value="-" onClick={(e) => handleHeadcount(e)}>
              -
            </button>
            <input
              className="border w-[32px] h-[32px] font-bold text-center community__input-number"
              type="number"
              value={headcount}
              defaultValue={headcount}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10);
                if (newValue >= 1) {
                  setHeadcount(newValue);
                }
              }}
              min={1}
            />
            <button className="community__button-number" value="+" onClick={(e) => handleHeadcount(e)}>
              +
            </button>
          </div>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label">내용</label>
            <p className="community__label-description">
              나눔/거래에 대해 추가적인 설명이 필요하신 경우 작성해주세요. 최대 3,000글자까지 입력 가능합니다.
            </p>
          </div>
          <div className="quill-container">
            <ReactQuill className="quill-editor" onChange={setEditorContent} theme="snow" />
          </div>
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

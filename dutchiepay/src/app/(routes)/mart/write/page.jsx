'use client';

import '@/styles/community.css';

import Image from 'next/image';
import Link from 'next/link';
import Location_Modal from '@/app/(routes)/location/page';
import TextEditor from '@/app/_components/_community/TextEditor';
import { useState } from 'react';

export default function MartWrite() {
  const [filter, setFilter] = useState('마트');
  const [headcount, setHeadcount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [locationDescription, setLocationDescription] = useState('');

  const handleHeadcount = (e) => {
    if (e.target.value === '-') {
      if (headcount === 1) return;
      setHeadcount(headcount - 1);
    } else {
      if (headcount === 10) return;
      setHeadcount(headcount + 1);
    }
  };

  const handleLocationUpdate = (description) => {
    console.log(locationDescription);

    setLocationDescription(description);
    setIsModalOpen(false);
  };

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px] mt-[60px] mx-[60px]">
      {isModalOpen ? (
        <Location_Modal onLocationUpdate={handleLocationUpdate} />
      ) : (
        <form>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="category">
              카테고리
            </label>
            <small className="community__label-description">
              작성하실 게시글의 카테고리를 선택해주세요.
            </small>
          </div>
          <ul className="flex gap-[16px]">
            <li>
              <button
                className={`community__filter ${filter === '마트' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('마트')}
                type="button"
              >
                마트
              </button>
            </li>
            <li>
              <button
                className={`community__filter ${filter === '배달' ? `community__filter--selected` : ''}`}
                onClick={() => setFilter('배달')}
                type="button"
              >
                배달
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
            <label className="community__label" htmlFor="date">
              일시
            </label>
            <small className="community__label-description">
              마트/배달을 희망하는 날짜와 시간을 입력해주세요.
            </small>
          </div>
          <div className="flex gap-[8px]">
            <input id="date" className="community__input-date" type="date" />
            <input className="community__input-date" type="time" />
          </div>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="trading-place">
              거래 장소
            </label>
            <small className="community__label-description">
              거래를 진행할 장소입니다. 수정이 불가능합니다.
            </small>
          </div>
          <input
            className="community__input-text"
            type="text"
            value={`${locationDescription}`}
            disabled={true}
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="max-number">
              최대 인원 수
            </label>
            <small className="community__label-description">
              마트/배달을 함께 할 최대 인원 수를 입력해주세요.
            </small>
          </div>
          <div className="w-full flex items-center gap-[4px] mb-[12px]">
            <button
              className="community__button-number"
              value="-"
              onClick={(e) => handleHeadcount(e)}
              type="button"
            >
              -
            </button>
            <input
              id="max-number"
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
              max={10}
              aria-required="true"
            />
            <button
              className="community__button-number"
              value="+"
              onClick={(e) => handleHeadcount(e)}
              type="button"
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="community__label" htmlFor="content">
              내용
            </label>
            <small className="community__label-description">
              나눔/거래에 대해 추가적인 설명이 필요하신 경우 작성해주세요. 최대
              3,000글자까지 입력 가능합니다.
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
              href="/mart"
              className="border border-blue--500 text-blue--500 text-lg font-semibold rounded-lg px-[60px] py-[6px]"
              role="button"
            >
              취소
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}

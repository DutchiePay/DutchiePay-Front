'use client';

import Link from 'next/link';
import Location_Modal from '@/app/_components/_community/_local/LocationModal';
import TextEditor from '@/app/_components/_community/_common/TextEditor';
import { useState } from 'react';

export default function UsedWrite() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [locationDescription, setLocationDescription] = useState('');
  const [filter, setFilter] = useState('거래');

  const handlePrice = (e) => {
    let price = e.target.value;
    if (!/^[\d,]*$/.test(price)) {
      return;
    }

    price = price.replaceAll(',', '');
    if (price.length >= 10) {
      alert('가격 초과');
      return;
    }
    price = Number(price.replaceAll(',', ''));
    if (isNaN(price)) {
      setInputValue(inputValue);
    } else {
      setInputValue(price.toLocaleString('ko-KR'));
    }
  };

  const handleLocationUpdate = (description) => {
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
            <label className="font-bold text-lg" htmlFor="category">
              카테고리
            </label>
            <small className="text-sm text-gray--500">
              작성하실 게시글의 카테고리를 선택해주세요.
            </small>
          </div>
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="font-bold text-lg" htmlFor="title">
              제목
            </label>
            <small className="text-sm text-gray--500">
              게시글 제목을 입력해주세요. 최대 60글자까지 입력 가능합니다.
            </small>
          </div>
          <input
            id="title"
            className="w-[150px] border rounded-lg outline-none py-[8px] px-[12px]"
            type="text"
            placeholder="게시글 제목"
            aria-required="true"
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="font-bold text-lg" htmlFor="product">
              상품명
            </label>
            <small className="text-sm text-gray--500">
              상품명을 입력해주세요. 최대 10글자까지 입력 가능합니다.
            </small>
          </div>
          <input
            id="product"
            className="w-[150px] border rounded-lg outline-none py-[8px] px-[12px]"
            type="text"
            placeholder="상품명"
            aria-required="true"
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="font-bold text-lg" htmlFor="trading-place">
              거래 장소
            </label>
            <small className="text-sm text-gray--500">
              거래를 진행할 장소입니다. 수정이 불가능합니다.
            </small>
          </div>

          <input
            id="trading-place"
            className="w-[600px] border rounded-lg outline-none py-[8px] pl-[50px]"
            type="text"
            value={`${locationDescription}`}
            disabled={true}
            aria-disabled="true"
          />
          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="font-bold text-lg" htmlFor="price">
              가격
            </label>
            <small className="text-sm text-gray--500">
              판매를 희망하시는 가격을 작성해주세요. 1 이상의 숫자만 입력
              가능합니다.
            </small>
          </div>
          <div className="flex gap-[12px] items-end">
            <input
              id="price"
              className="w-[150px] border rounded-lg outline-none py-[8px] px-[12px]"
              type="text"
              value={inputValue || ''}
              onChange={(e) => handlePrice(e)}
              disabled={filter === '나눔'}
              aria-disabled={filter === '나눔'}
              placeholder={filter === '나눔' ? '나눔' : '가격 (숫자만 입력)'}
            />
          </div>

          <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
            <label className="font-bold text-lg" htmlFor="content">
              내용
            </label>
            <small className="text-sm text-gray--500">
              나눔/거래에 대해 추가적인 설명이 필요하신 경우 작성해주세요. 최대
              3,000글자까지 입력 가능합니다.
            </small>
          </div>
          <TextEditor />
          <div className="flex justify-center gap-[16px] mt-[48px]">
            <button
              className="bg-blue--500 text-white text-lg font-semibold rounded-lg px-[60px] py-[6px]"
              type="submit"
            >
              등록
            </button>
            <Link
              href="/used"
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

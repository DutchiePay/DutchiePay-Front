'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import LandingMap from '@/app/_components/_community/_local/LandingMap';
import Link from 'next/link';
import info from '../../../../public/image/info.svg';
import selectArrow from '../../../../public/image/selectArrow.svg';

export default function PostDetail({ menu, isTrade = false, isMyPostWritten }) {
  return (
    <article
      className="w-[290px] h-[750px] sticky top-[150px] pl-[20px] py-[40px]"
      aria-labelledby="trade-info"
    >
      <div className="flex items-center gap-[8px]">
        <Image
          className="w-[30px] h-[30px]"
          src={info}
          alt="info"
          width={30}
          height={30}
        />
        <h2 className="text-2xl font-bold">상세 정보</h2>
      </div>
      <small className="text-xs text-gray--500">
        기재된 내용은 변동될 수 있습니다.
      </small>
      <div className="flex flex-col gap-[12px] mt-[16px] mb-[24px]">
        {menu === '거래/나눔' ? (
          <>
            <div className="flex justify-between items-center">
              <strong>판매 상품</strong>
              <p>스탠딩 선풍기</p>
            </div>
            <div className="flex justify-between items-center">
              <strong>판매 가격</strong>
              <p>{isTrade ? '15,000원' : '나눔 상품'}</p>
            </div>
            <div className="flex justify-between">
              <strong>거래 희망 장소</strong>
              <p>삼각지역 1번 출구</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <strong>날짜</strong>
              <p>12월 12일 목요일 오후 09:25</p>
            </div>
            <div className="flex justify-between items-center">
              <strong>최대 인원</strong>
              <span className="flex gap-[4px]">
                3명<p className="text-sm">(현 : 2명)</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <strong>장소</strong>
              <p>삼각지역 1번 출구</p>
            </div>
          </>
        )}
        <LandingMap />
        <div className="flex justify-between items-center">
          <strong>진행 상태</strong>
          {isMyPostWritten ? (
            <div className="w-[130px] relative">
              <select
                className="select-no-arrow border w-[130px] px-[12px] py-[4px] rounded-lg outline-none cursor-pointer"
                aria-label="거래 상태 선택"
              >
                <option>{isTrade ? '거래' : '나눔'} 대기중</option>
                <option>예약중</option>
                <option>{isTrade ? '거래' : '나눔'} 완료</option>
              </select>
              <Image
                className="w-[12px] h-[6px] absolute top-[14px] right-[8px] pointer-events-none"
                src={selectArrow}
                alt="arrow"
                width={12}
                height={6}
                aria-hidden="true"
              />
            </div>
          ) : (
            <p>{isTrade ? '거래' : '나눔'} 대기중</p>
          )}
        </div>
      </div>
      <button className="w-full rounded-lg py-[12px] text-white font-bold bg-blue--500">
        채팅방으로 이동
      </button>
    </article>
  );
}

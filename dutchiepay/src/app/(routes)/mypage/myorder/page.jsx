'use client';

import Image from 'next/image';
import Order from '@/app/_components/Order';
import arrow from '../../../../../public/image/arrow.svg';
import { useState } from 'react';

export default function MyOrder() {
  const [filter, setFilter] = useState('전체');

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

  // 구매내역 없을 때 UI도 구현해야 함
  return (
    <main className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">구매내역</h1>
      <ul className="flex gap-[8px] my-[16px]">
        <li
          className={`mypage__filter ${filter === '전체' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          전체
        </li>
        <li
          className={`mypage__filter ${filter === '공구진행중' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          공구진행중
        </li>
        <li
          className={`mypage__filter ${filter === '배송준비중' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          배송준비중
        </li>
        <li
          className={`mypage__filter ${filter === '배송중' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          배송중
        </li>
        <li
          className={`mypage__filter ${filter === '배송완료' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          배송완료
        </li>
        <li
          className={`mypage__filter ${filter === '구매확정' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          구매확정
        </li>
        <li
          className={`mypage__filter ${filter === '공구실패' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          공구실패
        </li>
        <li
          className={`mypage__filter ${filter === '취소/환불' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          취소/환불
        </li>
      </ul>
      <section className="flex flex-col gap-[24px]">
        <Order />
        <Order />
        <Order />
        <Order />
      </section>
      <button className="w-[250px] rounded flex justify-between items-center px-[24px] py-[8px] border mx-auto mt-[60px] mb-[40px]">
        구매내역 더 불러오기
        <Image className="w-[20px] h-[20px]" src={arrow} alt="arrow" width={20} height={20} />
      </button>
    </main>
  );
}

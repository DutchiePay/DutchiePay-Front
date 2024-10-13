'use client';

import '@/styles/mypage.css';

import Image from 'next/image';
import MyAsks from '@/app/_components/_mypage/MyAsk';
import { useSelector } from 'react-redux';

// 문의내역 없을 때 UI도 구현해야 함
export default function MyAsk() {
  const nickname = useSelector((state) => state.login.user.nickname);

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">문의내역</h1>
      <small>{nickname}님께서 문의하신 내역들을 확인할 수 있습니다.</small>
      <section className="flex flex-col gap-[16px] mt-[16px]">
        <MyAsks />
        <MyAsks />
        <MyAsks />
        <MyAsks />
      </section>
    </section>
  );
}

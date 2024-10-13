'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import MyReviews from '@/app/_components/_mypage/MyReview';
import { useSelector } from 'react-redux';

// 리뷰내역 없을 때 UI도 구현해야 함
export default function MyReview() {
  const nickname = useSelector((state) => state.login.user.nickname);

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">작성한 후기</h1>
      <small>{nickname}님께서 작성하신 상품의 후기를 확인할 수 있습니다.</small>
      <section className="flex flex-col gap-[12px] mt-[16px]">
        <MyReviews />
        <MyReviews />
        <MyReviews />
        <MyReviews />
      </section>
    </section>
  );
}

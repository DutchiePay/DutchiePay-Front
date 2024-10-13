'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Coupon_List from '@/app/_components/_mypage/Coupon_List';
import { useSelector } from 'react-redux';

// 쿠폰 없을 때 UI도 구현해야 함
export default function MyCoupon() {
  const nickname = useSelector((state) => state.login.user.nickname);

  return (
    <section className="ml-[250px] p-[30px] min-h-[734px]">
      <h1 className="text-[32px] font-bold">사용 가능 쿠폰</h1>
      <small>{nickname}님께서 사용가능한 쿠폰을 확인할 수 있습니다.</small>
      <section className="mt-[32px] flex flex-wrap gap-y-[20px] gap-x-[16px]">
        <Coupon_List />
        <Coupon_List />
        <Coupon_List />
        <Coupon_List />
      </section>
    </section>
  );
}

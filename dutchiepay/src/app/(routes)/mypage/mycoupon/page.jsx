import '@/styles/mypage.css';

import Coupon_List from '@/app/_components/_mypage/Coupon_List';

// 쿠폰 없을 때 UI도 구현해야 함
export default function MyCoupon() {
  return (
    <section className="ml-[250px] p-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold mb-[16px]">사용 가능 쿠폰</h1>
      <section className="flex flex-wrap gap-y-[20px] gap-x-[16px]">
        <Coupon_List />
        <Coupon_List />
        <Coupon_List />
        <Coupon_List />
      </section>
    </section>
  );
}

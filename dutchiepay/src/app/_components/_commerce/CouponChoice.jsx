'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

export default function CouponChoice() {
  const couponPopup = () => {
    window.open('/coupon', '_blank', 'width=620, height=670');
  };

  return (
    <article className="flex flex-col gap-[8px]">
      <div className="flex gap-[12px] items-center">
        <h2 className="text-2xl font-bold">쿠폰 적용</h2>
        <button
          className="h-[28px] text-white text-sm bg-blue--500 rounded-lg px-[12px] flex justify-center items-center"
          onClick={couponPopup}
          type="button"
        >
          쿠폰 선택
        </button>
      </div>
      <input
        className="w-full text-sm p-[12px] rounded-lg"
        type="text"
        disabled={true}
        placeholder="쿠폰을 선택해주세요."
      />
    </article>
  );
}

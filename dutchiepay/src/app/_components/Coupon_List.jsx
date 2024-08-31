import '../../styles/mypage.css';

import Image from 'next/image';

export default function Coupon_List() {
  return (
    <div className="w-[300px] h-[180px] border flex flex-col gap-[4px] rounded-lg">
      <div className="px-[16px] py-[8px]">
        <p className="text-gray--500 text-sm mt-[4px]">2024-12-21 까지</p>
        <p className="text-[20px] font-bold">신규 가입 감사 쿠폰</p>
        <div className="flex justify-end items-baseline mt-[4px]">
          <p className="text-sm text-blue--500">
            총 금액에서 <strong className="text-3xl text-blue--500">15%</strong>
          </p>
        </div>
      </div>
      <hr className="border border-dashed border-gray-300 w-full my-[4px]" />
      <div className="px-[16px]">
        <p className="text-[12px] font-semibold text-gray--600">사용 가능 조건</p>
        <p className="text-[12px] text-gray--500">주문 금액 15,000원 이상 시 사용 가능</p>
      </div>
    </div>
  );
}

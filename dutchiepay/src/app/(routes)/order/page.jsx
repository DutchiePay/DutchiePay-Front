import '@/styles/globals.css';
import '@/styles/commerce.css';

import CouponChoice from '@/app/_components/_commerce/CouponChoice';
import Image from 'next/image';
import Link from 'next/link';
import OrderInfo from '@/app/_components/_commerce/OrderInfo';
import Orderer from '@/app/_components/_commerce/Orderer';
import Payment from '@/app/_components/_commerce/Payment';

export default function Order() {
  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo />
      <section className="mt-[40px] flex justify-between">
        <div className="w-[600px] flex flex-col gap-[32px]">
          <Orderer />
          <CouponChoice />
        </div>
        <Payment />
      </section>
    </section>
  );
}

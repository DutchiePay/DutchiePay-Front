'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import OrderInfo from '@/app/_components/_commerce/_order/OrderInfo';
import Orderer from '@/app/_components/_commerce/_order/Orderer';
import Payment from '@/app/_components/_commerce/_order/Payment';
import { useForm } from 'react-hook-form';

export default function Order() {
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = (FormData) => {
    console.log(FormData);
  };

  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo />
      <form
        className="mt-[40px] flex justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[600px] flex flex-col gap-[12px]">
          <Orderer register={register} setValue={setValue} />
        </div>
        <Payment />
      </form>
    </section>
  );
}

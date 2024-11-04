'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useEffect, useState } from 'react';

import OrderInfo from '@/app/_components/_commerce/_order/OrderInfo';
import Orderer from '@/app/_components/_commerce/_order/Orderer';
import Payment from '@/app/_components/_commerce/_order/Payment';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Order() {
  const access = useSelector((state) => state.login.access);
  const searchParams = useSearchParams();
  const buyId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');
  const [orderInfo, setOrderInfo] = useState(null);
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/delivery?buyId=${buyId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setOrderInfo(response.data);
      } catch (error) {
        alert('주문 데이터를 불러오는 도중 문제가 발생했습니다.');
      }
    };

    fetchProduct();
  }, [buyId, quantity, access]);

  const onSubmit = (FormData) => {
    // 결제 제출 코드 추후 구현 예정
    console.log(FormData);
  };

  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo orderInfo={orderInfo} quantity={quantity} />
      <form
        className="mt-[40px] flex justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[600px] flex flex-col gap-[12px]">
          <Orderer register={register} setValue={setValue} />
        </div>
        <Payment orderInfo={orderInfo} quantity={quantity} />
      </form>
    </section>
  );
}

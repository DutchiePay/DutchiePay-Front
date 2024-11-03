'use client';
import '@/styles/globals.css';
import '@/styles/commerce.css';

import OrderInfo from '@/app/_components/_commerce/OrderInfo';
import Orderer from '@/app/_components/_commerce/Orderer';
import Payment from '@/app/_components/_commerce/Payment';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Order() {
  const access = useSelector((state) => state.login.access);
  const searchParams = useSearchParams();
  const buyId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');
  const storeName = searchParams.get('storeName');
  const [orderInfo, setOrderInfo] = useState(null);
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
        console.log(response.data);

        setOrderInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [buyId, quantity]);
  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo
        orderInfo={orderInfo}
        quantity={quantity}
        storeName={storeName}
      />
      <section className="mt-[40px] flex justify-between">
        <div className="w-[600px] flex flex-col gap-[32px]">
          <Orderer />
        </div>
        <Payment orderInfo={orderInfo} quantity={quantity} />
      </section>
    </section>
  );
}

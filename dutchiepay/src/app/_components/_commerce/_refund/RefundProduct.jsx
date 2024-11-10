'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';
import { useState } from 'react';

export default function RefundProduct({ buyId, orderNum }) {
  const [orderInfo, setOrderInfo] = useState(null);
  useFetchOrderProduct({ buyId, setOrderInfo });

  return (
    <>
      {orderInfo && (
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded"
            src={orderInfo.productImg}
            alt={orderInfo.productName}
            width={100}
            height={100}
          />
          <div className="flex flex-col justify-center w-[400px] gap-[4px]">
            <p className="text-sm text-gray--500 font-normal">{orderNum}</p>
            <p className="text-xs text-gray--500">{orderInfo.storeName}</p>
            <strong className="title--multi-line">
              {orderInfo.productName}
            </strong>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';
import { useState } from 'react';

export default function ReviewProduct({ buyId, orderNum }) {
  const [productInfo, setProductInfo] = useState(null);
  useFetchOrderProduct({ buyId: buyId, setOrderInfo: setProductInfo });

  return (
    <>
      {productInfo && (
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded"
            src={productInfo.productImg}
            alt={productInfo.productName}
            width={100}
            height={100}
          />
          <div className="flex flex-col justify-center w-[400px] gap-[4px]">
            <p className="text-sm text-gray--500 font-normal">{orderNum}</p>
            <p className="text-xs text-gray--500">{productInfo.storeName}</p>
            <strong className="title--multi-line">
              {productInfo.productName}
            </strong>
          </div>
        </div>
      )}
    </>
  );
}

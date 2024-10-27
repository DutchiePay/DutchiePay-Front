'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import ProductInfo from '@/app/_components/_commerce/_productDetail/ProductInfo';
import RemainingTime from '@/app/_components/_commerce/RemainingTime';
import time from '/public/image/time.svg';
import { useState } from 'react';

export default function ProductHeader({ product, productId }) {
  const [isEnd, setIsEnd] = useState(true); // 마감 여부
  const endDateString = '2024-12-25T22:00:00Z';

  return (
    <article className="mt-[40px] flex justify-between">
      <div>
        <div className="relative w-[500px] h-[500px]">
          <Image
            className="object-cover"
            src={product?.productImg}
            alt={product?.productName}
            fill
          />
        </div>

        <div className="flex justify-center gap-[12px] py-[4px] items-center text-sm font-semibold bg-gray--200">
          <Image
            className="w-[15px] h-[15px]"
            src={time}
            alt="남은 시간"
            width={15}
            height={15}
          />
          <RemainingTime
            endTime={endDateString}
            isEnd={isEnd}
            setIsEnd={setIsEnd}
          />
        </div>
      </div>
      <ProductInfo isEnd={isEnd} product={product} productId={productId} />
    </article>
  );
}

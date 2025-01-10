'use client';

import Image from 'next/image';
import ProductInfo from '@/app/_components/_commerce/_productDetail/ProductInfo';
import RemainingTime from '@/app/_components/_commerce/_productDetail/RemainingTime';
import time from '/public/image/time.svg';
import { useState } from 'react';

export default function ProductHeader({ product, productId }) {
  const [isEnd, setIsEnd] = useState(false); // 마감 여부

  return (
    <article className="mt-[40px] flex justify-between">
      <div>
        <div className="relative w-[500px] h-[500px]">
          <Image
            className="object-cover"
            src={product?.productImg}
            alt={product?.productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            endTime={product?.deadline}
            isEnd={isEnd}
            setIsEnd={setIsEnd}
          />
        </div>
      </div>
      <ProductInfo isEnd={isEnd} product={product} productId={productId} />
    </article>
  );
}

'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import AskForm from '@/app/_components/_commerce/_ask/AskForm';
import Image from 'next/image';
import RemainingTime from '@/app/_components/_commerce/_productDetail/RemainingTime';
import clock from '/public/image/clock.svg';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AskModal() {
  const searchParams = useSearchParams();
  const buyId = searchParams.get('buyId');
  const [isEnd, setIsEnd] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  useFetchOrderProduct({ buyId, setOrderInfo: setProductInfo });

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">문의 작성</h1>
      <p className="text-xs text-gray--500">
        문의 작성 서비스는 불편한 서비스로 인한 불만, 분쟁을 해결해드리기 위해
        운영됩니다.
        <br /> 불편한 문의 사항을 작성해주시면 빠르게 답변해드리겠습니다.
      </p>
      <section className="mt-[40px]">
        {productInfo && (
          <div className="flex gap-[12px] mb-[12px]">
            <Image
              className="rounded-lg"
              src={productInfo?.productImg}
              alt={productInfo?.productName}
              width={100}
              height={100}
            />
            <div className="flex flex-col w-[400px] gap-[4px]">
              <p className="text-xs text-gray--500">{productInfo?.storeName}</p>
              <strong className="title--multi-line">
                {productInfo?.productName}
              </strong>
              <div className="flex gap-[4px] text-sm text-blue--700 font-semibold">
                <Image src={clock} alt="남은 시간" width={16} height={16} />
                <RemainingTime
                  endTime={productInfo?.expireDate}
                  isEnd={isEnd}
                  setIsEnd={setIsEnd}
                />
              </div>
            </div>
          </div>
        )}
        <hr />
        <AskForm buyId={buyId} />
      </section>
    </main>
  );
}

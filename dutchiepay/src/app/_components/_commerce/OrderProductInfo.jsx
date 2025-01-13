'use client';

import Image from 'next/image';
import clock from '/public/image/clock.svg';
import { getRemainingTime } from '@/app/_util/getFormatDate';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';
import { useState } from 'react';

export default function OrderProductInfo({
  buyId,
  orderNum,
  showRemainingTime = false,
}) {
  const [orderInfo, setOrderInfo] = useState(null);
  useFetchOrderProduct({ buyId, setOrderInfo });

  return (
    <>
      {orderInfo && (
        <div className="flex gap-[12px] mb-[12px]">
          <div
            className={`relative ${showRemainingTime ? 'w-[120px] h-[120px]' : 'w-[100px] h-[100px]'}`}
          >
            <Image
              className="rounded object-cover"
              src={orderInfo.productImg}
              alt={orderInfo.productName}
              fill
            />
          </div>
          <div className="flex flex-col justify-center w-[400px] gap-[4px]">
            <p className="text-sm text-gray--500 font-normal">{orderNum}</p>
            <p className="text-xs text-gray--500">{orderInfo.storeName}</p>
            <strong className="line-clamp-2">{orderInfo.productName}</strong>
            {showRemainingTime && orderInfo.expireDate && (
              <div className="flex gap-[4px] text-sm text-blue--700 font-semibold">
                <Image src={clock} alt="남은 시간" width={16} height={16} />
                <p>{getRemainingTime('ask', orderInfo.expireDate)}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

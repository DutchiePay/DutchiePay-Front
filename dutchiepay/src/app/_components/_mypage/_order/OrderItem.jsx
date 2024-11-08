'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import OrderActionButton from './OrderActionButton';
import OrderDetail from './OrderDetail';
import more from '/public/image/more.svg';

export default function OrderItem({ product }) {
  const [isMore, setIsMore] = useState(false);
  const [status, setStatus] = useState(null);

  const handleIsMore = () => {
    setIsMore(!isMore);
  };

  useEffect(() => {
    if (product.deliveryState) setStatus(product.deliveryState.trim());
  }, [product]);

  return (
    <div className="w-[730px] relative flex flex-col gap-[8px]">
      <div className="flex">
        <strong>{product.orderDate.replaceAll('-', '. ')}</strong>
        <p className="mypage-orders__order-number">{product.orderNum}</p>
      </div>
      <div className="flex gap-[20px]">
        <Link
          className="w-[140px] h-[140px] relative"
          href={`/commerce/${product.buyId}`}
        >
          <Image
            className="absolute rounded-lg cursor-pointer"
            src={product.productImg}
            alt={product.productName}
            fill
          />
        </Link>

        <div className="h-[140px] flex flex-col gap-[4px] justify-center">
          <strong className="text-2xl text-blue--500">
            {product.deliveryState}
          </strong>
          <Link
            href={`/commerce/${product.buyId}`}
            className="max-w-[520px] title--single-line font-medium"
          >
            {product.productName}
          </Link>
          <div className="flex gap-[8px] items-center">
            <p className="text-lg font-bold">
              {product.totalPrice.toLocaleString('ko-KR')}원
            </p>
            <p className="text-sm text-gray--500">/ {product.quantity}개</p>
          </div>
          <OrderActionButton
            product={product}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </div>
      <OrderDetail product={product} isMore={isMore} />
      <Image
        className={`w-[20px] h-[20px] absolute bottom-[8px] right-[20px] ${isMore ? 'rotate-180' : ''}`}
        src={more}
        alt="more"
        width={20}
        height={20}
        onClick={(e) => handleIsMore(e)}
        role="button"
      />
    </div>
  );
}

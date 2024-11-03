'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Link from 'next/link';

export default function OrderButton({ isEnd, productId, quantity, storeName }) {
  return (
    <>
      <Link
        className={`${isEnd ? 'bg-gray--200 cursor-not-allowed' : 'bg-blue--500'} inline-block text-center text-white font-bold py-[12px] w-full rounded`}
        href={`/order?productId=${productId}&quantity=${quantity}&storeName=${storeName}`}
        onClick={(e) => {
          if (isEnd) {
            e.preventDefault(); // 마감됐을 경우, Link 동작되지 않도록 기본 동작 제거
          }
        }}
      >
        결제하기
      </Link>
      <p className="mt-[4px] text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
    </>
  );
}

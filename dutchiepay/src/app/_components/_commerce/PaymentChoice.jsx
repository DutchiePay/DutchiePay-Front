'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useState } from 'react';

export default function PaymentChoice() {
  const [paymentMethod, setPaymentMethod] = useState('');

  return (
    <article className="mt-[8px] flex flex-col gap-[8px]">
      <h3 className="text-lg font-bold">결제 수단 선택</h3>
      <div className="flex justify-between">
        <button
          className={`product-order__button ${paymentMethod === '신용카드' && 'product-order__button__active'}`}
          onClick={() => setPaymentMethod('신용카드')}
          type="button"
        >
          신용카드
        </button>
        <button
          className={`product-order__button ${paymentMethod === '무통장 입금' && 'product-order__button__active'}`}
          onClick={() => setPaymentMethod('무통장 입금')}
          type="button"
        >
          무통장 입금
        </button>
        <button
          className={`product-order__button ${paymentMethod === '카카오페이' && 'product-order__button__active'}`}
          onClick={() => setPaymentMethod('카카오페이')}
          type="button"
        >
          카카오페이
        </button>
      </div>
    </article>
  );
}

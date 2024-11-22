'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useState } from 'react';

export default function PaymentChoice({ setValue }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    setValue('paymentMethod', method);
  };

  return (
    <article className="mt-[8px] flex flex-col gap-[8px]">
      <h3 className="text-lg font-bold">결제 수단 선택</h3>
      <div className="flex justify-between">
        <label
          className={`product-order__button ${paymentMethod === '신용카드' ? 'product-order__button__active' : ''}`}
          onClick={() => handlePaymentChange('신용카드')}
        >
          <input
            className="hidden text-center"
            type="radio"
            value="신용카드"
            checked={paymentMethod === '신용카드'}
            onChange={() => handlePaymentChange('신용카드')}
          />
          신용카드
        </label>
        <label
          className={`product-order__button ${paymentMethod === '카카오페이' ? 'product-order__button__active' : ''}`}
          onClick={() => handlePaymentChange('카카오페이')}
        >
          <input
            className="hidden text-center"
            type="radio"
            value="카카오페이"
            checked={paymentMethod === '카카오페이'}
            onChange={() => handlePaymentChange('카카오페이')}
          />
          카카오페이
        </label>
      </div>
    </article>
  );
}

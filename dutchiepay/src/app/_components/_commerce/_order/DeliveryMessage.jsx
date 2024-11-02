'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import selectArrow from '/public/image/selectArrow.svg';
import { useState } from 'react';

export default function DeliveryMessage({ register }) {
  const [isSelfMessage, setIsSelfMessage] = useState(false); // 배송 메시지 직접 입력 여부

  return (
    <tr className={`border ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}>
      <th className="w-[120px] bg-gray--100">배송메시지</th>
      <td
        className={`flex flex-col justify-center gap-[8px] px-[16px] ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}
      >
        <div className="w-[400px] relative">
          <select
            {...register('deliveryMessage')}
            className="select-no-arrow w-[400px] px-[8px] py-[6px] text-sm border rounded-lg outline-none"
            onChange={(e) => setIsSelfMessage(e.target.value === 'option5')}
          >
            <option value="">배송메시지를 선택해주세요.</option>
            <option value="option1">문 앞에 놓아 주시면 돼요.</option>
            <option value="option2">직접 받을게요. (부재시 문 앞)</option>
            <option value="option3">벨 누르지 말아주세요.</option>
            <option value="option4">배송 전에 미리 연락주세요.</option>
            <option value="option5">직접 입력하기</option>
          </select>
          <Image
            className="w-[12px] h-[6px] absolute top-[12px] right-[10px] cursor-pointer pointer-events-none"
            src={selectArrow}
            alt="arrow"
            width={12}
            height={6}
            aria-hidden="true"
          />
        </div>
        {isSelfMessage && (
          <input
            {...register('customMessage')}
            className="w-full border rounded-lg px-[8px] py-[6px] text-sm outline-none"
            placeholder="배송메시지"
          />
        )}
      </td>
    </tr>
  );
}

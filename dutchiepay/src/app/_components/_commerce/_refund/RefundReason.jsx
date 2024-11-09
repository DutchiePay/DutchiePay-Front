'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import selectArrow from '/public/image/selectArrow.svg';

export default function RefundReason({ register }) {
  return (
    <div className="flex gap-[40px] items-start mt-[16px]">
      <strong className="min-w-[40px]">사유</strong>
      <div className="w-full flex flex-col gap-[8px]">
        <div className="relative">
          <select
            {...register('reason')}
            className="w-full select-no-arrow outline-none border text-sm p-[8px] rounded"
          >
            <option value="제품 불량">제품 불량</option>
            <option value="오배송">오배송</option>
            <option value="제품 누락">제품 누락</option>
            <option value="배송 중 파손">배송 중 파손</option>
            <option value="기타">기타</option>
          </select>
          <Image
            className="w-[12px] h-[6px] absolute top-[15px] right-[10px] cursor-pointer pointer-events-none"
            src={selectArrow}
            alt="arrow"
            width={12}
            height={6}
            aria-hidden="true"
          />
        </div>
        <textarea
          {...register('detail')}
          className="h-[200px] text-sm border p-[12px] outline-none resize-none rounded"
          placeholder="사유를 작성해주세요."
          spellCheck="false"
        />
      </div>
    </div>
  );
}

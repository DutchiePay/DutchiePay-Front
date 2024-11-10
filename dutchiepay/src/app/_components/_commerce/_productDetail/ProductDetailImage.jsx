'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetailImage({ productDetail }) {
  const [isMoreView, setIsMoreView] = useState(false);

  return (
    <div className="relative w-full">
      {!isMoreView && (
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent h-[450px] pointer-events-none">
          {/* 이미지 그라데이션 */}
        </div>
      )}
      <Image
        src={productDetail}
        alt="상세정보"
        width={0}
        height={0}
        sizes="100vw"
        className={`w-full ${isMoreView ? 'h-auto object-contain' : 'h-[450px] overflow-hidden object-cover object-top'}`}
      />
      {!isMoreView && (
        <button
          className="absolute bottom-0 left-0 w-full bg-white py-[8px] rounded-3xl border drop-shadow-sm"
          onClick={() => setIsMoreView(true)}
        >
          더보기
        </button>
      )}
    </div>
  );
}

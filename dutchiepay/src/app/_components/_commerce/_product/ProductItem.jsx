'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import ProductLike from '../ProductLike';
import Rating from '@/app/_components/_rating/Rating';

export default function ProductItem({ item }) {
  return (
    <Link
      href={`/commerce/${item.buyId}`}
      title={item.productName}
      className="w-[232px] flex flex-col justify-center"
    >
      <div className="w-full h-[240px] relative overflow-hidden object-cover">
        <Image
          className={`w-full h-[240px] transform transition-transform duration-300 hover:scale-110`}
          src={item.productImg}
          alt={item.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <div className="flex gap-[8px] items-center">
          <Rating rating={4.3} size={15} />
          <p className="text-xs text-gray--500">
            ({item.reviewCount > 999 ? '999+' : item.reviewCount})
          </p>
        </div>
        <ProductLike isLiked={item.isLiked} productId={item.buyId} size={22} />
      </div>
      <p className="min-h-[48px] mt-[8px] title--multi-line font-medium">
        {item.productName}
      </p>
      <div className="mt-[4px] flex gap-[8px] items-center">
        {item.discountPercent > 0 && (
          <>
            <p className="text-red--500 font-semibold">
              {item.discountPercent}%
            </p>
            <p className="text-xs text-gray--500 line-through">
              {item.productPrice.toLocaleString('ko-KR')}원
            </p>
          </>
        )}
        <strong>{item.discountPrice.toLocaleString('ko-KR')}원</strong>
      </div>
      <div className="mt-[8px] flex justify-between items-baseline">
        <span
          className={`${item.expireDate < 0 ? '' : 'text-blue--500'} text-lg font-semibold flex gap-[4px] items-baseline`}
        >
          {Math.round(item.nowCount / item.skeleton)}%
          <p className="text-sm font-medium">달성</p>
        </span>
        <p
          className={`${item.expireDate === 0 ? 'text-red--500' : 'text-gray--500'} text-xs font-medium`}
        >
          {item.expireDate < 0
            ? '공구마감'
            : item.expireDate === 0
              ? '오늘 마감'
              : `${item.expireDate}일 남음`}
        </p>
      </div>
      <progress
        id="product-list-progress"
        className={`product-list-progress w-full h-[3px] ${item.expireDate < 0 ? 'product-list-progress__end' : ''}`}
        value={Math.round(item.nowCount / item.skeleton)}
        min={0}
        max={100}
      />
    </Link>
  );
}

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/app/_components/_rating/Rating';
import fullheart from '/public/image/fullheart.svg';
import heart from '/public/image/heart.svg';
import product from '/public/image/product1.jpg';
import { useState } from 'react';

export default function ProductItem({ item }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isTodayEnd, setIsTodayEnd] = useState(true); // 오늘 마감 (추후에는 제거될 데이터)

  const handleIsLiked = (e) => {
    e.preventDefault(); // Link 동작하지 않도록 함
    e.stopPropagation(); // Link로 전파되지 않도록 함
    setIsLiked(!isLiked);
  };

  return (
    <Link
      href={`/commerce/${item.buyPostId}`}
      title={
        item.productName.length <= 10
          ? item.productName
          : item.productName.slice(0, 10) + '...'
      }
      className="w-[232px] flex flex-col justify-center"
    >
      <div className="w-full h-[240px] relative overflow-hidden object-cover">
        <Image
          className={`w-full h-[240px] transform transition-transform duration-300 hover:scale-110`}
          src={item.productImg}
          alt={item.productName}
          fill
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <div className="flex gap-[8px] items-center">
          <Rating rating={4.3} size={15} />
          <p className="text-xs text-gray--500">(999+)</p>
        </div>
        {item.liked ? (
          <Image
            className="cursor-pointer"
            onClick={handleIsLiked}
            src={fullheart}
            alt="좋아요"
            width={22}
            height={22}
          />
        ) : (
          <Image
            className="cursor-pointer"
            onClick={handleIsLiked}
            src={heart}
            alt="좋아요"
            width={22}
            height={22}
          />
        )}
      </div>
      <p className="min-h-[48px] mt-[8px] title--multi-line font-medium">
        {item.productName}
      </p>
      <div className="mt-[4px] flex gap-[8px] items-center">
        <p className="text-red--500 font-semibold">{item.discountPercent}%</p>
        <p className="text-xs text-gray--500 line-through">
          {item.productPrice.toLocaleString('ko-KR')}원
        </p>
        <strong>{item.discountPrice.toLocaleString('ko-KR')}원</strong>
      </div>
      <div className="mt-[8px] flex justify-between items-baseline">
        <span
          className={`${isEnd ? '' : 'text-blue--500'} text-lg font-semibold flex gap-[4px] items-baseline`}
        >
          {Math.round(item.nowCount / item.skeleton)}%
          <p className="text-sm font-medium">달성</p>
        </span>
        <p
          className={`${isTodayEnd ? 'text-red--500' : 'text-gray--500'} text-xs font-semibold`}
        >
          {item.expireDate < 1
            ? '공구마감'
            : item.expireDate === 1
              ? '오늘 마감'
              : `${item.expireDate}일 남음`}
        </p>
      </div>
      <progress
        id="product-list-progress"
        className={`product-list-progress w-full h-[3px] ${isEnd ? 'product-list-progress__end' : ''}`}
        value={Math.round(item.nowCount / item.skeleton)}
        min={0}
        max={100}
      />
    </Link>
  );
}

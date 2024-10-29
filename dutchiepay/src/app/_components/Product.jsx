import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Rating from './_rating/Rating';
import fullheart from '../../../public/image/fullheart.svg';
import heart from '../../../public/image/heart.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Product() {
  const [isLiked, setIsLiked] = useState(false);
  const [isEnd, setIsEnd] = useState(true);
  const [isTodayEnd, setIsTodayEnd] = useState(false); 

  const handleIsLiked = (e) => {
    e.preventDefault(); // Link 동작하지 않도록 함
    e.stopPropagation(); // Link로 전파되지 않도록 함
    setIsLiked(!isLiked);
  };

  return (
    <Link
      href="/commerce/detail?productId=123"
      className="w-[220px] flex flex-col gap-[4px]"
    >
      <div className="w-full h-[148px] relative overflow-hidden">
        <Image
          className="w-full h-[148px] transform transition-transform duration-300 hover:scale-110"
          src={product}
          alt="애슐리 볶음밥"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <div className="flex gap-[8px] items-center">
          <Rating rating={3.9} size={15} />
          <p className="text-[12px] text-gray--500">(999+)</p>
        </div>
        {isLiked ? (
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
      <p className="mt-[4px] title--multi-line font-medium">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
        대용 직장인 도시락
      </p>
      <div className="flex gap-[8px] items-center">
        <p className="text-red--500 font-semibold">30%</p>
        <p className="text-[12px] text-gray--500 line-through">32,500원</p>
        <strong className="text-[16px]">27,500원</strong>
      </div>

      <div className="mt-[4px] flex justify-between items-baseline">
        <span
          className={`${isEnd ? '' : 'text-blue--500'} text-lg font-semibold flex items-baseline gap-[4px]`}
        >
          43%<p className="text-sm font-medium">달성</p>
        </span>
        <p
          className={`${isTodayEnd ? 'text-red--500' : 'text-gray--500'} text-xs font-semibold`}
        >
          {isEnd ? '공구마감' : isTodayEnd ? '오늘 마감' : '20일 남음'}
        </p>
      </div>
      <progress
        id="product-list-progress"
        className={`product-list-progress w-full h-[3px] ${isEnd ? 'product-list-progress__end' : ''}`}
        value={43}
        min={0}
        max={100}
      />
    </Link>
  );
}

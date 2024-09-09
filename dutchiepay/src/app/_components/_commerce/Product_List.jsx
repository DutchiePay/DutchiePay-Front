import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Rating from '../_rating/Rating';
import fullheart from '../../../../public/image/fullheart.svg';
import heart from '../../../../public/image/heart.svg';
import product from '../../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Product_List() {
  const [isLiked, setIsLiked] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isTodayEnd, setIsTodayEnd] = useState(false); // 오늘 마감 (추후에는 제거될 데이터)

  const handleIsLiked = (e) => {
    e.preventDefault(); // Link 동작하지 않도록 함
    e.stopPropagation(); // Link로 전파되지 않도록 함
    setIsLiked(!isLiked);
  };

  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <Link
      href="/commerce/123"
      title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
      className="w-[232px] flex flex-col justify-center"
    >
      <div className="w-full h-[240px] relative overflow-hidden">
        <Image
          className={`w-full h-[240px] transform transition-transform duration-300 hover:scale-110`}
          src={product}
          alt="애슐리 볶음밥"
          width={210}
          height={210}
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <div className="flex gap-[8px] items-center">
          <Rating rating={4.3} size={15} />
          <p className="text-xs text-gray--500">(999+)</p>
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
      <p className="mt-[8px] title--multi-line font-medium">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
        대용 직장인 도시락
      </p>
      <div className="mt-[4px] flex gap-[8px] items-center">
        <p className="text-red--500 font-semibold">30%</p>
        <p className="text-xs text-gray--500 line-through">32,500원</p>
        <strong>27,500원</strong>
      </div>
      <div className="mt-[8px] flex justify-between items-baseline">
        <p
          className={`${isEnd ? '' : 'text-blue--500'} text-lg font-semibold flex gap-[4px] items-baseline`}
        >
          43%<p className="text-sm font-medium">달성</p>
        </p>
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

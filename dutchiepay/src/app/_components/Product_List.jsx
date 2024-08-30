import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import Rating from './Rating';
import fullheart from '../../../public/image/fullheart.svg';
import heart from '../../../public/image/heart.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Product_List() {
  const [isLiked, setIsLiked] = useState(false);
  const [isEnd, setIsEnd] = useState(true);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <Link
      href="/commerce/123"
      title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
      className="w-[240px] border px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
    >
      <div className="w-[210px] h-[210px] rounded-xl relative">
        <Image
          className={`w-[210px] h-[210px] rounded-xl ${isEnd ? 'grayscale' : ''}`}
          src={product}
          alt="애슐리 볶음밥"
          width={210}
          height={210}
        />
        {isEnd && (
          <div className="absolute top-[30px] left-[30px] rounded-full bg-white/70 w-[150px] h-[150px] flex flex-col justify-center items-center">
            <strong className="text-4xl font-black">마감</strong>
            <p className="text-xs tracking-tighter font-medium">다음 공구를 기대해주세요</p>
          </div>
        )}
        <div className="w-[30px] h-[30px] border bg-white absolute bottom-[4px] right-[4px] rounded-md flex justify-center items-center">
          {isLiked ? (
            <Image
              className="w-[22px] h-[22px] rounded-xl transition-all duration-5000 ease-in"
              src={fullheart}
              alt="fulllike"
              width={22}
              height={22}
              onClick={() => handleIsLiked()}
            />
          ) : (
            <Image
              className="w-[22px] h-[22px] rounded-xl transition-all duration-5000 ease-in"
              src={heart}
              alt="like"
              width={22}
              height={22}
              onClick={() => handleIsLiked()}
            />
          )}
        </div>
      </div>
      <p className="title--multi-line text-md font-medium">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인
        도시락
      </p>
      <div className="flex gap-[8px] items-center">
        <p className="text-[12px] text-gray--500 line-through">32,500원</p>
        <strong className="text-[16px]">27,500원</strong>
        <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">30%</p>
      </div>
      <div className="flex gap-[8px] items-center">
        <Rating rating={4.3} size={15} />
        <p className="text-[12px] text-gray--500">(999+)</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-blue--500 text-[18px] font-semibold">43%</p>
        <p className="text-gray--500 text-[12px]">20일 남음</p>
      </div>
      <progress
        id="product-list-progress"
        className="product-review-progress w-full h-[5px]"
        value={43}
        min={0}
        max={100}
      />
    </Link>
  );
}

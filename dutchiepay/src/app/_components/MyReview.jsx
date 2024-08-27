'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import more from '../../../public/image/more.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Review() {
  const [isPossible, setIsPossible] = useState(true); // 삭제 가능 여부
  const [isMore, setIsMore] = useState(false);

  const handleIsMore = (e) => {
    setIsMore(!isMore);
  };

  return (
    <div className="w-[730px] border rounded-lg p-[20px] flex gap-[12px] relative">
      <Image
        className="w-[120px] h-[120px] rounded-lg cursor-pointer"
        src={product}
        alt="애슐리 볶음밥"
        width={120}
        height={120}
      />
      <div className="w-[558px]">
        <div className="flex justify-between items-center">
          <Link href="#" className="inline-block max-w-[470px] title--single-line font-bold">
            애슐리 볶음밥 10인분 혼합 구성
            10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용
            직장인 도시락
          </Link>
          <div className="flex gap-[12px]">
            {isPossible && <button className="text-sm font-semibold">수정</button>}
            <button className="text-sm font-semibold">삭제</button>
          </div>
        </div>
        <div className="flex justify-between">
          <p>별점영역</p>
          <p className="text-xs text-gray--600">2024년 07월 14일</p>
        </div>
        <p className={`text-sm w-[510px] mt-[4px] ${isMore ? '' : 'mypage-reviews__review'}`}>
          이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다! 이 제품은 정말 대박이에요!
          사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이
          편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!
        </p>
      </div>
      <Image
        className={`w-[20px] h-[20px] absolute bottom-[8px] right-[20px] cursor-pointer ${isMore ? 'rotate-180' : ''}`}
        src={more}
        alt="more"
        width={20}
        height={20}
        onClick={(e) => handleIsMore(e)}
      />
    </div>
  );
}

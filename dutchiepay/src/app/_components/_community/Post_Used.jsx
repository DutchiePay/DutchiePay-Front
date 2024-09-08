import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import location from '../../../../public/image/location.svg';
import money from '../../../../public/image/money.svg';
import product from '../../../../public/image/product.svg';
import profile from '../../../../public/image/profile.jpg';
import { useState } from 'react';
import used from '../../../../public/image/used.jpg';

export default function Post_Used() {
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const [isTrade, setIsTrade] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  return (
    <Link
      href="/used/123"
      className="w-[240px] border rounded-xl flex flex-col gap-[4px] cursor-pointer"
    >
      <div className="rounded-t-xl h-[160px] relative overflow-hidden">
        <Image
          className={`rounded-t-xl w-[240px] h-[160px] transform transition-transform duration-300 hover:scale-110 ${isEnd ? 'grayscale-[50%]' : ''}`}
          src={hasThumbnail ? '' : used}
          alt="썸네일"
          width={240}
          height="auto"
          unoptimized
        />
        <div className="absolute top-[8px] left-[8px] text-xs text-blue--500 font-bold bg-white rounded-lg w-[54px] py-[2px] flex justify-center">
          {isTrade ? '거래' : '나눔'}완료
        </div>
      </div>
      <div className="w-[240px] px-[12px] pt-[4px] pb-[8px]">
        <strong className="inline-block w-[224px] title--single-line font-extrabold">
          효과적인 의사소통을 위한 비언어적 신호
        </strong>
        <div className="flex flex-col gap-[8px] my-[4px]">
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={product}
              alt="상품"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">버블 클렌저</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={location}
              alt="위치"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">이마트 부천점</p>
          </div>
          <div className="flex gap-[8px] items-center">
            <Image
              className="w-[18px] h-[18px]"
              src={money}
              alt="가격"
              width={18}
              height={18}
            />
            <p className="text-xs font-medium">
              {isTrade ? '15,000원' : '나눔'}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-[12px]">
          <div className="flex gap-[4px] items-center">
            <Image
              className="w-[16px] h-[16px] border rounded-full"
              src={profile}
              alt="profile"
              width={16}
              height={16}
            />
            <p className="font-semibold text-xs">한유진</p>
          </div>
          <p className="text-[12px] text-gray--500">3시간 전</p>
        </div>
      </div>
    </Link>
  );
}

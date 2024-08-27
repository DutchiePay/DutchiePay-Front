import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import fullheart from '../../../public/image/fullheart.svg';
import heart from '../../../public/image/heart.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Product_Like() {
  const [isLiked, setIsLiked] = useState(false);

  const handleIsLiked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Link href="/commerce/123" className="w-[172px] border px-[12px] py-[8px] flex flex-col gap-[4px]">
      <div className="w-[148px] h-[148px] rounded-xl relative">
        <Image className="w-[148px] h-[148px] rounded-xl" src={product} alt="애슐리 볶음밥" width={148} height={148} />
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
      <p className="mt-[4px] title--multi-line text-sm">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인
        도시락
      </p>
      <div className="flex gap-[8px] items-center">
        <p className="text-[12px] text-gray--500 line-through">32,500원</p>
        <strong className="text-[16px]">27,500원</strong>
      </div>
      <div className="flex gap-[8px] items-center">
        <div>별점영역</div>
        <p className="text-[12px] text-gray--500">(999+)</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-blue--500 text-[18px] font-semibold">43%</p>
        <p className="text-gray--500 text-[12px]">20일 남음</p>
      </div>
      <hr></hr>
    </Link>
  );
}

'use client';

import '../../styles/mypage.css';

import Image from 'next/image';
import Link from 'next/link';
import Rating from './Rating';
import more from '../../../public/image/more.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Review({ className }) {
  const [hasImages, setHasImages] = useState(true); // 이미지 유무
  const [isMore, setIsMore] = useState(false);

  const handleIsMore = (e) => {
    setIsMore(!isMore);
  };

  return (
    <div className={`w-[1020px] p-[20px] flex gap-[12px] relative ${className}`}>
      {hasImages && (
        <Image
          className="w-[120px] h-[120px] rounded-lg cursor-pointer"
          src={product}
          alt="애슐리 볶음밥"
          width={120}
          height={120}
        />
      )}

      <div className={hasImages ? 'w-[848px]' : 'w-[1000px]'}>
        <div className="flex justify-between">
          <strong className="text-lg">단단무지</strong>
          <Rating rating={2.2} size={20} />
        </div>
        <p className="text-xs text-gray--600">2024년 07월 14일</p>
        <p
          className={`text-sm ${hasImages ? 'max-w-[800px]' : 'max-w-[920px]'} mt-[4px] ${
            isMore ? '' : 'mypage-reviews__review'
          }`}
        >
          이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다! 이 제품은 정말 대박이에요!
          사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이
          편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은
          정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다! 이 제품은 정말 대박이에요! 사용하고 나서부터
          생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이
          제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고
          나서부터 생활이 편해졌어요. 강추합니다! 이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요.
          강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말
          대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터
          생활이 편해졌어요. 강추합니다! 이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이
          제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고
          나서부터 생활이 편해졌어요. 강추합니다!
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

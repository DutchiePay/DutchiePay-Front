import '@/styles/globals.css';

import { useEffect, useState } from 'react';
import Rating from '../_rating/Rating';
import RatingDitsribution from '../_rating/RatingDistribution';

export default function ReviewInfo({ dist, avg }) {
  // dist[0]의 총합 계산
  const total = dist[0]?.reduce((sum, value) => sum + value, 0) || 0; // 기본값 0 설정

  return (
    <div className="flex justify-center gap-[24px]">
      <div className="w-[175px] flex flex-col gap-[12px] justify-center item-center text-center">
        <strong>총 {total}건</strong>
        <p>
          평균 <strong className="ml-[8px] text-4xl">{avg}점</strong>
        </p>
        <Rating rating={avg} size={28} />
      </div>
      <div className="w-[400px] flex flex-col justify-between">
        {dist[0]?.map((value, index) => (
          <RatingDitsribution
            key={index}
            rating={5 - index}
            total={total} // 총합을 total에 설정
            count={value}
          />
        ))}
      </div>
    </div>
  );
}

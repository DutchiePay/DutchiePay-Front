import '@/styles/globals.css';

import Rating from '../_rating/Rating';
import RatingDitsribution from '../_rating/RatingDistribution';

export default function ReviewInfo({ reviewCount, rating, ratingCount }) {
  return (
    <div className="flex justify-center gap-[24px]">
      <div className="w-[175px] flex flex-col gap-[12px] justify-center item-center text-center">
        <strong>총 {reviewCount}건</strong>
        <p>
          평균 <strong className="ml-[8px] text-4xl">{rating}점</strong>
        </p>
        <Rating rating={4.8} size={28} />
      </div>
      <div className="w-[400px] flex flex-col justify-between">
        {ratingCount &&
          ratingCount.map((value, index) => (
            <RatingDitsribution
              key={index}
              rating={5 - index}
              total={439}
              count={value}
            />
          ))}
      </div>
    </div>
  );
}

import React from 'react';
import RatingDragger from '@/app/_components/_rating/RatingDragger';

const ReviewRating = ({ initialRating, onRatingChange, rating }) => {
  return (
    <div>
      <div className="flex items-baseline gap-[8px]">
        <strong className="text-blue--500 font-semibold">만족도</strong>
        <p className="text-xs text-gray--500">
          별을 드래그 또는 클릭해주세요. 정수 단위로만 입력 가능합니다.
        </p>
      </div>
      <div className="mt-[4px] flex items-center gap-[16px]">
        <RatingDragger
          onRatingChange={onRatingChange}
          initialRating={initialRating}
        />
        <p className="text-sm text-gray--500">{rating}/5점</p>
      </div>
    </div>
  );
};

export default ReviewRating;

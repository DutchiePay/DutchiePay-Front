import '@/styles/commerce.css';
import '@/styles/globals.css';

import ReviewInfo from './ReviewInfo';
import ReviewItem from './ReviewItem';
import { useState } from 'react';

export default function Review({ rating, ratingCount, reviewCount }) {
  const [isAll, setIsAll] = useState(true); // 모든 리뷰 -> false일 경우 포토리뷰

  return (
    <>
      <ReviewInfo
        reviewCount={reviewCount}
        rating={rating}
        ratingCount={ratingCount}
      />
      <div className="mt-[60px] mb-[16px] flex items-center">
        <input
          id="photo_review"
          type="checkbox"
          className="input__checkbox"
          onChange={(e) => setIsAll(!e.target.checked)}
        />
        <label className="ml-[8px]" htmlFor="photo_review">
          포토리뷰만
        </label>
      </div>
      <ReviewItem />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
    </>
  );
}

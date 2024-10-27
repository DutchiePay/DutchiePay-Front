import '@/styles/commerce.css';
import '@/styles/globals.css';

import ReviewInfo from './ReviewInfo';
import ReviewItem from './ReviewItem';
import { useState } from 'react';
import Pagination from '../Pagination';

export default function Review() {
  const [isAll, setIsAll] = useState(true); // 모든 리뷰 -> false일 경우 포토리뷰
  const buyId = 7; // 게시글 정보 저장 시 변경 예정
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const size = 6;
  const [totalItems, setTotalItems] = useState(0);

  return (
    <>
      <ReviewInfo dist={[100, 309, 10, 8, 12]} />
      <div className="mt-[60px] mb-[16px] flex items-center">
        <input
          type="checkbox"
          className="input__checkbox"
          onChange={(e) => setIsAll(!e.target.checked)}
        />
        <label className="ml-[8px]">포토리뷰</label>
      </div>
      <ReviewItem />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      <ReviewItem className="product-review-item--not-first" />
      {totalItems > 0 && (
        <Pagination
          activePage={activePage}
          totalItems={totalItems}
          size={size}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

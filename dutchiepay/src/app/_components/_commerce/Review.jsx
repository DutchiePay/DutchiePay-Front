import '@/styles/commerce.css';
import '@/styles/globals.css';

import ReviewInfo from './ReviewInfo';
import ReviewItem from './ReviewItem';
import { useState, useEffect } from 'react';
import Pagination from '../Pagination';
import axios from 'axios';
import Image from 'next/image';
import review from '/public/image/nonItem/review.svg'; // 이미지 경로 추가

export default function Review({
  productId,
  ratingCount,
  reviewCount,
  photoReviewCount,
}) {
  const [isAll, setIsAll] = useState(true); // 모든 리뷰 -> false일 경우 포토리뷰
  const buyId = productId;
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const size = 6;
  const [totalItems, setTotalItems] = useState(0);
  const [avg, setAvg] = useState(0);
  useEffect(() => {
    if (isAll) {
      setTotalItems(reviewCount || 0);
    } else {
      setTotalItems(photoReviewCount || 0);
    }
  }, [reviewCount, photoReviewCount]);

  const fetchItems = async (page) => {
    try {
      const photo = isAll ? 0 : 1; // isAll에 따라 photo 값 설정
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/review?buyId=${buyId}&photo=${photo}&page=${page}&limit=${size}`
      );
      // 리뷰 데이터를 설정
      setItems(response.data.reviews);

      setAvg(response.data.avg ?? 0); // null 병합 연산자로 처리 null 값이면 0 반환
    } catch (error) {
      console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchItems(activePage);
  }, [activePage, isAll]); // activePage와 isAll이 변경될 때 데이터 요청

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <ReviewInfo dist={[ratingCount]} avg={avg} />
      <div className="mt-[60px] mb-[16px] flex items-center">
        <input
          type="checkbox"
          className="input__checkbox"
          checked={!isAll} // 체크박스 상태 조정
          onChange={(e) => setIsAll(!e.target.checked)}
        />
        <label className="ml-[8px]">포토리뷰</label>
      </div>
      {items.length === 0 ? ( // 리뷰가 없을 경우
        <div className="mb-[32px] w-[1020px] min-h-[140px] text-center">
          <Image
            src={review}
            alt="문의 내용 없음"
            width={40}
            height={40}
            className="pt-[32px] mx-auto"
          />
          <p className="my-[40px]">등록된 리뷰가 없습니다.</p>
        </div>
      ) : (
        items.map((item, index) => {
          return (
            <ReviewItem
              key={item.reviewId} // reviewId를 key로 사용
              item={item}
              isAll={isAll}
              className={index > 0 ? 'product-review-item--not-first' : ''}
            />
          );
        })
      )}
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

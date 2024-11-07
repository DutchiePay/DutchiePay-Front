import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Pagination from '../Pagination';
import ReviewInfo from './ReviewInfo';
import ReviewItem from './ReviewItem';
import axios from 'axios';
import review from '/public/image/nonItem/review.svg';

export default function Review({
  productId,
  rating,
  ratingCount,
  reviewCount,
  photoReviewCount,
}) {
  const [isAll, setIsAll] = useState(true); // 모든 리뷰 -> false일 경우 포토리뷰
  const [reviews, setReviews] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (isAll) {
      setTotalItems(reviewCount || 0);
    } else {
      setTotalItems(photoReviewCount || 0);
    }
  }, [isAll, reviewCount, photoReviewCount]);

  useEffect(() => {
    const handleFetchReviews = async (page) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/review?buyId=${productId}&photo=${isAll ? 0 : 1}&page=${page}&limit=6`
        );
        setReviews(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
      }
    };

    handleFetchReviews(activePage);
  }, [productId, activePage, isAll]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

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
          checked={!isAll}
          onChange={(e) => setIsAll(!e.target.checked)}
        />
        <label className="ml-[8px]" htmlFor="photo_review">
          포토리뷰만
        </label>
      </div>
      {reviews.length === 0 ? (
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
        reviews.map((item, index) => {
          return (
            <ReviewItem
              key={item.reviewId}
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
          limit={6}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

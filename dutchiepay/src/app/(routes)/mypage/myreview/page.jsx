'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import MyReviews from '@/app/_components/_mypage/MyReview';
import axios from 'axios';
import review from '/public/image/nonItem/review.svg';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  const nickname = useSelector((state) => state.login.user.nickname);
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();

  const handleFetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        /*const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleFetchReviews();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }*/
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [access]);

  const handleDeleteReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== reviewId)
    );
  };

  useEffect(() => {
    handleFetchReviews();
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'REFRESH_REVIEW') {
        handleFetchReviews();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleFetchReviews]);

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">작성한 후기</h1>
      <small>{nickname}님께서 작성하신 상품의 후기를 확인할 수 있습니다.</small>
      <section className="flex flex-col gap-[12px] mt-[16px]">
        {reviews.length === 0 ? (
          <div className="mt-[20%] w-[730px] items-center text-center">
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
          reviews.map((item) => (
            <MyReviews
              key={item.reviewId}
              item={item}
              onDelete={handleDeleteReview}
            />
          ))
        )}
      </section>
    </section>
  );
}

'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import MyReviews from '@/app/_components/_mypage/MyReview';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import review from '/public/image/nonItem/review.svg';
// 리뷰내역 없을 때 UI도 구현해야 함
export default function MyReview() {
  const [reviews, setReviews] = useState([]);
  const nickname = useSelector((state) => state.login.user.nickname);
  const access = useSelector((state) => state.login.access);

  useEffect(() => {
    const handleFetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response);
        setReviews(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 데 오류가 발생했습니다:', error);
      }
    };
    handleFetchReviews();
  }, [access]);
  console.log(reviews);
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
          reviews.map((item) => {
            return <MyReviews key={item.reviewId} item={item} />;
          })
        )}
      </section>
    </section>
  );
}

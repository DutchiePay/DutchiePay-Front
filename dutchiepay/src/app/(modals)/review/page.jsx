'use client';

import OrderProductInfo from '@/app/_components/_commerce/OrderProductInfo';
import ReviewForm from '@/app/_components/_commerce/_review/ReviewForm';
import useFetchReview from '@/app/hooks/useFetchReview';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ReviewModal() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const buyId = searchParams.get('buyId');
  const orderId = searchParams.get('orderId');
  const reviewId = searchParams.get('reviewId');
  const [reviewInfo, setReviewInfo] = useState(null);
  useFetchReview({ reviewId, setReviewInfo });

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">후기 {reviewId ? '수정' : '작성'}</h1>
      <p className="text-xs text-gray--500">
        제품을 이용하시면서 좋았던 점, 불편하셨던 점 등을 공유해주시면 다른
        고객들에게 도움이 됩니다.
        <br />
      </p>
      <section className="mt-[40px]">
        <OrderProductInfo buyId={buyId} orderNum={orderNum} />
        <hr />
        <ReviewForm
          reviewId={reviewId}
          orderId={orderId}
          initialContent={reviewInfo?.content}
          initialImages={reviewInfo?.reviewImg || []}
          initialRating={reviewInfo?.rating}
        />
      </section>
    </main>
  );
}

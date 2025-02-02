'use client';

import useOrderStateAction from '@/app/hooks/useOrderStateAction';

export default function OrderActionButton({ product, setStatus, status }) {
  const openPopup = (url) => {
    window.open(url, '_blank', 'width=620, height=670');
  };
  const handleButtonClick = useOrderStateAction({ product, setStatus, status });

  return (
    <div className="flex gap-[8px]">
      <button
        className="text-white text-sm bg-blue-500 rounded px-[56px] py-[8px]"
        onClick={handleButtonClick}
      >
        {status === '공구진행중'
          ? '주문취소'
          : status === '구매확정' && !product.hasReviewed
            ? '후기작성'
            : status === '배송완료'
              ? '구매확정'
              : '문의하기'}
      </button>
      {status === '배송완료' ? (
        <button
          className="text-blue-500 text-sm border border-blue--500 rounded px-[56px] py-[8px]"
          onClick={() =>
            openPopup(
              `/refund?orderId=${product.orderId}&orderNum=${product.orderNum}&buyId=${product.buyId}`
            )
          }
        >
          환불/교환
        </button>
      ) : (status === '구매확정' && !product.hasReviewed) ||
        status === '공구진행중' ? (
        <button
          className="text-blue-500 text-sm border border-blue--500 rounded px-[56px] py-[8px]"
          onClick={() =>
            openPopup(
              `/ask?orderNum=${product.orderNum}&buyId=${product.buyId}`
            )
          }
        >
          문의하기
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

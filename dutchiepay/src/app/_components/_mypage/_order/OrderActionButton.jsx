'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

export default function OrderActionButton({ product, setStatus, status }) {
  const access = useSelector((state) => state.login.access);
  const openPopup = (url) => {
    window.open(url, '_blank', 'width=620, height=670');
  };

  const handleButtonClick = async () => {
    if (status === '공구진행중') {
      if (
        confirm(
          `공동구매를 취소하시겠습니까?\n확인을 누르실 경우 결제하신 수단으로 ${product.totalPrice.toLocaleString('ko-KR')}원이 환불처리 됩니다.\n결제 취소된 건은 복구가 불가능합니다.`
        )
      ) {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/exchange`,
            { orderId: product.orderId },
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          alert(
            '정상적으로 환불처리 되었습니다.\n환불 처리는 영업일 기준 2~3일 이내에 완료됩니다.'
          );
          setStatus('주문취소');
        } catch (error) {
          if (error.response.data.message === '주문정보를 찾을 수 없습니다.') {
            alert('존재하지 않는 주문입니다. 주문번호를 다시 체크해주세요.');
          } else if (
            error.response.data.message === '주문자 정보가 일치하지 않습니다.'
          ) {
            alert(
              '사용자의 주문이 아닙니다. 해당 계정으로 결제하신 주문만 처리 가능합니다.'
            );
          } else alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    } else if (status === '구매확정') {
      openPopup(`/review?orderNum=${product.orderNum}`);
    } else if (status === '배송완료') {
      if (
        confirm(
          '구매확정을 진행하시겠습니까?\n구매확정된 상품은 환불/교환이 어렵습니다.'
        )
      ) {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/purchase`,
            { orderId: product.orderId },
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          setStatus('구매확정');
        } catch (error) {
          if (error.response.data.message === '주문정보를 찾을 수 없습니다.') {
            alert('존재하지 않는 주문입니다. 주문번호를 다시 체크해주세요.');
          } else if (
            error.response.data.message === '주문자 정보가 일치하지 않습니다.'
          ) {
            alert(
              '사용자의 주문이 아닙니다. 해당 계정으로 결제하신 주문만 처리 가능합니다.'
            );
          } else alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    } else
      openPopup(`/ask?orderNum=${product.orderNum}&buyId=${product.buyId}`);
  };

  return (
    <div className="flex gap-[8px]">
      <button
        className="text-white text-sm bg-blue-500 rounded px-[56px] py-[8px]"
        onClick={handleButtonClick}
      >
        {status === '공구진행중'
          ? '주문취소'
          : status === '구매확정'
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
      ) : status === '구매확정' || status === '공구진행중' ? (
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

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
    if (status === '공구진행중')
      openPopup(`/cancel?orderNum=${product.orderNum}`);
    else if (status === '배송준비중' || status === '배송중')
      openPopup(`/ask?orderNum=${product.orderNum}`);
    else if (status === '배송완료') {
      if (
        confirm(
          '구매확정을 진행하시겠습니까?\n구매확정된 상품은 환불/교환이 어렵습니다.'
        )
      ) {
        try {
          await axios.patch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/orders/purchase`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
          setStatus('구매확정');
        } catch (error) {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    } else openPopup(`/review?orderNum=${product.orderNum}`);
  };

  return (
    <div className="flex gap-[8px]">
      {status === '공구실패' || status === '취소/환불' ? (
        <button
          className="text-white text-sm rounded px-[56px] py-[8px]"
          aria-hidden="true"
        >
          {/*버튼없음*/}
        </button>
      ) : (
        <button
          className="text-white text-sm bg-blue-500 rounded px-[56px] py-[8px]"
          onClick={handleButtonClick}
        >
          {status === '공구진행중'
            ? '구매취소'
            : status === '배송준비중' || status === '배송중'
              ? '문의하기'
              : status === '배송완료'
                ? '구매확정'
                : '리뷰작성'}
        </button>
      )}
      {status === '배송완료' && (
        <button
          className="text-blue-500 text-sm border border-blue--500 rounded px-[56px] py-[8px]"
          onClick={() => openPopup(`/refund?orderNum=${product.orderNum}`)}
        >
          환불/교환
        </button>
      )}
    </div>
  );
}

import '@/styles/commerce.css';
import '@/styles/globals.css';

import PaymentChoice from './PaymentChoice';

export default function Payment({ setValue, orderInfo, quantity }) {
  return (
    <article className="w-[380px] flex flex-col gap-[8px]">
      <h2 className="text-2xl font-bold">결제 정보</h2>
      <div className="pt-[12px] flex flex-col gap-[12px] border rounded">
        <div className="flex justify-between px-[16px]">
          <p className="text-gray--500 text-sm">판매가</p>
          <p>{orderInfo?.originalPrice.toLocaleString('ko-KR')}원</p>
        </div>
        <div className="flex justify-between px-[16px]">
          <p className="text-gray--500 text-sm">구매가</p>
          <p className="text-blue--500 font-semibold">
            {orderInfo?.salePrice.toLocaleString('ko-KR')}원
          </p>
        </div>
        <div className="flex justify-between px-[16px]">
          <p className="text-gray--500 text-sm">수량</p>
          <p>{quantity}개</p>
        </div>
        <div className="flex justify-between px-[16px]">
          <p className="text-gray--500 text-sm">배송비</p>
          <p>무료배송</p>
        </div>
        <hr />
        <div className="px-[16px] mb-[12px] flex justify-between items-center">
          <strong className="text-lg">최종 결제 금액</strong>
          <p className="text-xl text-blue--500 font-bold">
            {(orderInfo?.salePrice * quantity).toLocaleString('ko-KR')}원
          </p>
        </div>
      </div>

      <PaymentChoice setValue={setValue} />

      <button
        className="w-full mt-[16px] py-[8px] bg-blue--500 text-white text-lg font-semibold rounded-lg"
        type="submit"
      >
        {(orderInfo?.salePrice * quantity).toLocaleString('ko-KR')}원 ㆍ
        결제하기
      </button>
    </article>
  );
}

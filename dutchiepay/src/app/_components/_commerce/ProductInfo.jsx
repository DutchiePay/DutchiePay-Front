import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import heart from '../../../../public/image/emptyHeart.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductInfo({ isEnd }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    //주문 내역 세션 저장 코드 추가 필요
    router.push('/order');
  };

  const handleQuantity = (e) => {
    if (e.target.value === '-') {
      if (quantity === 1) return;
      setQuantity(quantity - 1);
    } else {
      if (quantity >= 99) return;
      setQuantity(quantity + 1);
    }
  };
  return (
    <div className="w-[500px] px-[16px] py-[40px]">
      <h1 className="font-bold text-xl">
        애슐리 볶음밥 10인분 혼합 구성
        10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
        대용 직장인 도시락
      </h1>
      <div className="flex my-[4px] items-center gap-[8px]">
        <p className="line-through text-sm text-gray--500">32,500원</p>
        <p className="font-bold text-xl">27,500원</p>
        <p className="bg-red--500 rounded-xl text-white text-xs font-medium px-[6px] py-[2px]">
          15%
        </p>
      </div>
      <hr />
      <ul className="flex mt-[8px] mb-[30px] justify-between">
        <li className="product-summary__item">
          <p className="text-gray--500">공구 업체</p>
          <p className="text-xs">(주)이랜드팜앤푸드(서울)</p>
        </li>
        <li className="product-summary__item">
          <p className="text-gray--500">목표 수량</p>
          <p>25개</p>
        </li>
        <li className="product-summary__item">
          <p className="text-gray--500">판매된 수량</p>
          <p>100개</p>
          <p className="font-medium">(400%)</p>
        </li>
        <li className="product-summary__item">
          <p className="text-gray--500">좋아요 수</p>
          <p>14</p>
        </li>
        <li className="product-summary__item">
          <p className="text-gray--500">후기 수</p>
          <p>16</p>
        </li>
      </ul>
      <div className="w-full flex justify-end gap-[1px] mb-[4px]">
        <button
          className="product-quantity__button"
          value="-"
          onClick={(e) => handleQuantity(e)}
        >
          -
        </button>
        <input
          className="border w-[32px] h-[32px] font-bold text-center product-quantity__input"
          type="number"
          value={quantity}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10);
            if (newValue >= 99) {
              setQuantity(99);
            } else if (newValue >= 1) {
              setQuantity(newValue);
            }
          }}
          min={1}
          max={99}
        />
        <button
          className="product-quantity__button"
          value="+"
          onClick={(e) => handleQuantity(e)}
        >
          +
        </button>
      </div>
      <p className="text-end text-xs text-gray--500">
        1인 최대 구매 가능 수량은 99개 입니다.
      </p>
      <div className="flex justify-between items-center my-[8px]">
        <strong className="text-sm font-bold">총 상품 금액</strong>
        <p className="text-blue--500 text-lg font-semibold">
          {(27500 * quantity).toLocaleString()}원
        </p>
      </div>
      <hr />
      <div className="mt-[8px] mb-[30px] flex justify-between items-center">
        <div className="flex flex-col gap-[4px]">
          <p className="text-xs">
            배송비 : <strong>무료배송 (CJ대한통운)</strong>
          </p>
          <p className="text-xs">
            배송 출발 예정 : <strong>12월 02일</strong> 이후 순차배송
          </p>
        </div>
        <button className="w-[45px] h-[45px] border flex justify-center items-center">
          <Image src={heart} alt="좋아요" width={30} height={30} />
        </button>
      </div>
      <button
        className={`${isEnd ? 'bg-gray--200 cursor-not-allowed' : 'bg-blue--500'} text-white font-bold py-[12px] w-full rounded`}
        disabled={isEnd}
        onClick={handleOrder}
      >
        결제하기
      </button>
      <p className="mt-[4px] text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
    </div>
  );
}

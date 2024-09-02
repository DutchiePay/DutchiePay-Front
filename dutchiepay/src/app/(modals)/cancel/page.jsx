'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CancelModal() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');

  const closeWindow = () => {
    window.close();
  };

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">결제 취소</h1>
      <p className="text-xs text-gray--500">
        공동구매가 마감되기 전에 한해 취소 요청이 가능합니다. 일부 수량만
        선택적으로 취소가 불가능합니다. <br />
        반환된 쿠폰은 유효기간이 경과하지 않았을 경우 재사용 가능합니다.
      </p>
      <section className="mt-[40px]">
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded-lg"
            src={product}
            alt="애슐리 볶음밥"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-[400px] gap-[4px]">
            <p className="text-xs text-gray--500">(주)이랜드팜앤푸드(서울)</p>
            <strong className="title--multi-line">
              애슐리 볶음밥 10인분 혼합 구성
              10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
              대용 직장인 도시락
            </strong>
            <div className="flex items-center gap-[4px] text-sm text-blue--700 font-semibold">
              <Image src={clock} alt="남은 시간" width={16} height={16} />
              <div className="flex gap-[4px] items-baseline">
                <p>12일 08시간 36분 남음</p>
                <p className="text-xs text-gray--500 font-normal">| 수량 1개</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-[12px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between items-center">
              <strong>주문번호</strong>
              <p>24072512345</p>
            </div>
            <div className="flex justify-between items-center">
              <strong>취소 상품 합계</strong>
              <div className="flex flex-col items-end">
                <p className="text-sm">
                  취소 상품 합계 : <strong>57,500원</strong>
                </p>
                <p className="text-sm">
                  취소 배송비 합계 : <strong>0원 (무료배송)</strong>
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <strong>쿠폰 할인</strong>
              <div>
                <p>
                  <strong>17,250원</strong> (30% 할인)
                </p>
                <p className="text-red--500 text-xs font-medium">
                  사용한 쿠폰은 다시 반환됩니다.
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <strong>환불 예정 금액</strong>
              <p className="text-2xl text-blue--500 font-bold">40,250원</p>
            </div>
          </div>
          <p className="text-xs text-gray--500">
            결제 취소 이후 구매 내역 복구는 절대 되지 않습니다.
          </p>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button className="text-red-500 text-sm bg-red--100 rounded-lg px-[24px] py-[8px]">
              결제 취소
            </button>
            <button
              className="text-blue--500 text-sm border border-blue--200 rounded-lg px-[24px] py-[8px]"
              onClick={closeWindow}
            >
              취소
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

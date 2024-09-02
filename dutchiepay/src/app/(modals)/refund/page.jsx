'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import product from '../../../../public/image/product1.jpg';
import selectArrow from '../../../../public/image/selectArrow.svg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function RefundModal() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const [type, setType] = useState('환불');

  const closeWindow = () => {
    window.close();
  };

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">교환/환불</h1>
      <p className="text-xs text-gray--500">
        배송 과정에서 파손, 불량 등에 한해 교환/환불이 가능합니다. <br />
        구매자의 단순 변심에 의한 교환/환불은 절대 불가능합니다.
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
            <p className="text-sm text-gray--500 font-normal">수량 1개</p>
          </div>
        </div>
        <hr />
        <div className="mt-[12px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[40px] items-center">
              <strong className="min-w-[40px]">유형</strong>
              <ul className="flex gap-[8px]">
                <li
                  className={`product-refund-type ${type === '환불' ? 'product-refund-type__active' : ''}`}
                  onClick={(e) => setType(e.target.innerText)}
                >
                  환불
                </li>
                <li
                  className={`product-refund-type ${type === '교환' ? 'product-refund-type__active' : ''}`}
                  onClick={(e) => setType(e.target.innerText)}
                >
                  교환
                </li>
              </ul>
            </div>
            <div className="flex gap-[40px] items-start">
              <strong className="min-w-[40px]">사유</strong>
              <div className="w-full flex flex-col gap-[8px]">
                <div className="relative">
                  <select className="w-full select-no-arrow outline-none border text-sm p-[8px] rounded">
                    <option>제품 불량</option>
                    <option>오배송</option>
                    <option>제품 누락</option>
                    <option>배송 중 파손</option>
                    <option>기타</option>
                  </select>
                  <Image
                    className="w-[12px] h-[6px] absolute top-[15px] right-[10px] cursor-pointer pointer-events-none"
                    src={selectArrow}
                    alt="arrow"
                    width={12}
                    height={6}
                    aria-hidden="true"
                  />
                </div>
                <textarea
                  className="h-[200px] text-sm border p-[12px] outline-none resize-none rounded"
                  placeholder="사유를 작성해주세요."
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
          <p className="mt-[4px] text-xs text-gray--500 text-end">
            교환/환불 신청 시 영업일 기준 1~2일 내로 처리됩니다.
          </p>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button className="text-red-500 text-sm bg-red--100 rounded-lg px-[24px] py-[8px]">
              교환/환불 신청
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

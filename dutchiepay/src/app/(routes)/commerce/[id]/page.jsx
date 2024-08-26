'use client';

import '@/styles/commerce.css';

import Image from 'next/image';
import product from '../../../../../public/image/product1.jpg';
import productDetail from '../../../../../public/image/product_detail.jpg';
import time from '../../../../../public/image/time.svg';
import { useState } from 'react';

export default function CommerceDetail() {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('상품정보');

  const handleQuantity = (e) => {
    if (e.target.value === '-') {
      if (quantity === 1) return;
      setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleTab = (e) => {
    setTab(e.target.innerText);
  };

  return (
    <main className="min-h-[750px] w-[1020px]">
      <section className="mt-[40px] flex justify-between">
        <div>
          <Image className="w-[500px] h-[500px]" src={product} alt="애슐리 볶음밥" width={500} height={500} />
          <div className="flex justify-center gap-[12px] py-[4px] items-center text-sm font-semibold bg-gray--200">
            <Image className="w-[15px] h-[15px]" src={time} alt="남은 시간" width={15} height={15} />
            12일 08 : 36 : 34 남음
          </div>
        </div>
        <div className="w-[500px] px-[16px] py-[40px]">
          <h1 className="font-bold text-xl">
            애슐리 볶음밥 10인분 혼합 구성
            10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용
            직장인 도시락
          </h1>
          <div className="flex my-[4px] items-center gap-[8px]">
            <p className="line-through text-sm text-gray--500">32,500원</p>
            <p className="font-bold text-lg">27,500원</p>
            <p className="bg-red--500 rounded-xl text-white text-xs font-medium px-[6px] py-[2px]">15%</p>
          </div>
          <hr />
          <ul className="flex mt-[8px] mb-[30px] justify-between">
            <li className="product-summary__item">
              <p className="text-gray--500">공구 업체</p>
              <p className="text-xs">(주)이랜드팜앤푸드(서울)</p>
            </li>
            <li className="product-summary__item">
              <p className="text-gray--500">최소 인원</p>
              <p>25명</p>
            </li>
            <li className="product-summary__item">
              <p className="text-gray--500">현재 인원</p>
              <p>100명</p>
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
          <div className="w-full flex justify-end gap-[1px] mb-[12px]">
            <button className="product-quantity__button" value="-" onClick={(e) => handleQuantity(e)}>
              -
            </button>
            <input
              className="border w-[32px] h-[32px] font-bold text-center product-quantity__input"
              type="number"
              value={quantity}
              defaultValue={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
            />
            <button className="product-quantity__button" value="+" onClick={(e) => handleQuantity(e)}>
              +
            </button>
          </div>
          <div className="flex justify-between items-center my-[8px]">
            <strong className="text-sm font-bold">총 상품 금액</strong>
            <p className="text-blue--500 text-lg font-semibold">{(27500 * quantity).toLocaleString()}원</p>
          </div>
          <hr />
          <div className="mt-[8px] mb-[30px]">
            <div className="flex flex-col gap-[4px]">
              <p className="text-xs">
                배송비 : <strong>무료배송 (CJ대한통운)</strong>
              </p>
              <p className="text-xs">
                배송 출발 예정 : <strong>12월 02일</strong> 이후 순차배송
              </p>
            </div>
          </div>
          <button className="bg-blue--500 text-white font-bold py-[12px] w-full rounded">결제하기</button>
          <p className="mt-[4px] text-xs text-gray--500">
            ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가 가능합니다.
          </p>
        </div>
      </section>
      <ul className="mt-[40px] flex gap-[52px] border border-2 border-t-black p-[12px] sticky top-[158px] bg-white z-50">
        <li className={`${tab === '상품정보' ? 'product-tab__item--selected' : ''}`} onClick={(e) => handleTab(e)}>
          상품정보
        </li>
        <li className={`${tab === '후기' ? 'product-tab__item--selected' : ''}`} onClick={(e) => handleTab(e)}>
          후기
        </li>
        <li className={`${tab === '업체정보/문의' ? 'product-tab__item--selected' : ''}`} onClick={(e) => handleTab(e)}>
          업체정보/문의
        </li>
      </ul>
      <section className="mb-[60px] min-h-[1000px]">
        <div className="relative w-auto h-auto pt-[16px]">
          <Image src={productDetail} alt="상세정보" layout="intrinsic" unoptimized={true} />
        </div>
        <hr className="my-[40px]" />
        <div>
          <div className="flex justify-center gap-[16px]">
            <div className="w-[175px] flex flex-col gap-[12px] justify-center item-center text-center">
              <strong>총 16건</strong>
              <p>
                평균 <strong className="ml-[8px] text-4xl">4.8점</strong>
              </p>
              <p>별점영역</p>
            </div>
            <div className="w-[400px]">별점 분포 영역</div>
          </div>
        </div>
        <hr className="my-[40px]" />
        <div>문의</div>
      </section>
    </main>
  );
}

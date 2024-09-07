'use client';

import '@/styles/commerce.css';

import { useEffect, useRef, useState } from 'react';

import Ask from '@/app/_components/_commerce/Ask';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/app/_components/_rating/Rating';
import RatingDitsribution from '@/app/_components/_rating/RatingDistribution';
import Review from '@/app/_components/_commerce/Review';
import heart from '../../../../../public/image/emptyHeart.svg';
import product from '../../../../../public/image/product1.jpg';
import productDetail from '../../../../../public/image/product_detail.jpg';
import time from '../../../../../public/image/time.svg';
import { useRouter } from 'next/navigation';

export default function CommerceDetail() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('상품정보');
  const [isAll, setIsAll] = useState(true); // 모든 리뷰 -> false일 경우 포토리뷰

  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const askRef = useRef(null);

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

  const handleTab = (e) => {
    const selectedTab = e.target.innerText;
    setTab(selectedTab);

    if (selectedTab === '상품정보') {
      infoRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '후기') {
      reviewRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '업체정보/문의') {
      askRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  // 스크롤 위치에 따른 Tab 값 설정
  const handleScroll = () => {
    const reviewTop = reviewRef.current?.getBoundingClientRect().top;
    const askTop = askRef.current?.getBoundingClientRect().top;

    if (reviewTop <= 0 && askTop > 0) {
      setTab('후기');
    } else if (askTop <= 0) {
      setTab('업체정보/문의');
    } else {
      setTab('상품정보');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const askPopup = () => {
    window.open('/ask', '_blank', 'width=620, height=670');
  };

  // 작성 리뷰/문의 없을 때 구현해야 함
  return (
    <main className="min-h-[750px] w-[1020px]">
      <section className="mt-[40px] flex justify-between">
        <div>
          <Image
            className="w-[500px] h-[500px]"
            src={product}
            alt="애슐리 볶음밥"
            width={500}
            height={500}
          />
          <div className="flex justify-center gap-[12px] py-[4px] items-center text-sm font-semibold bg-gray--200">
            <Image
              className="w-[15px] h-[15px]"
              src={time}
              alt="남은 시간"
              width={15}
              height={15}
            />
            12일 08 : 36 : 34 남음
          </div>
        </div>
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
            1회 최대 구매 가능 수량은 99개 입니다.
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
            className="bg-blue--500 text-white font-bold py-[12px] w-full rounded"
            onClick={handleOrder}
          >
            결제하기
          </button>
          <p className="mt-[4px] text-xs text-gray--500">
            ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
            가능합니다.
          </p>
        </div>
      </section>
      <ul className="mt-[40px] flex gap-[52px] border border-2 border-t-black py-[12px] px-[40px] sticky top-[154px] bg-white z-50">
        <li
          className={`${tab === '상품정보' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          상품정보
        </li>
        <li
          className={`${tab === '후기' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          후기
        </li>
        <li
          className={`${tab === '업체정보/문의' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          업체정보/문의
        </li>
      </ul>
      <section className="mb-[60px] min-h-[1000px]">
        <div ref={infoRef} className="relative w-auto h-auto pt-[16px]">
          <Image
            className="mx-auto my-0"
            src={productDetail}
            alt="상세정보"
            unoptimized={true}
          />
        </div>
        <hr className="my-[40px]" ref={reviewRef} />
        <div>
          <div className="flex justify-center gap-[24px]">
            <div className="w-[175px] flex flex-col gap-[12px] justify-center item-center text-center">
              <strong>총 439건</strong>
              <p>
                평균 <strong className="ml-[8px] text-4xl">4.8점</strong>
              </p>
              <Rating rating={4.8} size={28} />
            </div>
            <div className="w-[400px] flex flex-col justify-between">
              {[100, 309, 10, 8, 12].map((value, index) => (
                <RatingDitsribution
                  key={index}
                  rating={5 - index}
                  total={439}
                  count={value}
                />
              ))}
            </div>
          </div>
          <div className="mt-[60px] mb-[16px] flex items-center">
            <input
              type="checkbox"
              className="input__checkbox"
              onChange={(e) => setIsAll(!e.target.checked)}
            />
            <label className="ml-[8px]">포토리뷰</label>
          </div>
          <Review />
          <Review className="product-review-item--not-first" />
          <Review className="product-review-item--not-first" />
          <Review className="product-review-item--not-first" />
          <Review className="product-review-item--not-first" />
          <Review className="product-review-item--not-first" />
        </div>
        <hr className="my-[40px]" ref={askRef} />
        <div className="flex flex-col mb-[100px] w-full">
          <strong>판매자 정보</strong>
          <table className="w-full mt-[16px] text-sm">
            <tbody className="block">
              <tr className="border-t border-b border-gray-300 mb-[4px] flex">
                <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
                  상호명
                </th>
                <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
                  카페이노스(주)
                </td>
                <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
                  대표자
                </th>
                <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
                  정시예
                </td>
              </tr>
              <tr className="border-t border-b border-gray-300 mb-4 flex">
                <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
                  업체주소
                </th>
                <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
                  경기도 광명시
                </td>
                <th className="bg-gray-100 w-44 px-[12px] py-1 border-gray-300 font-bold text-left">
                  전화번호
                </th>
                <td className="w-72 px-[12px] py-1 text-gray--300 text-semibold">
                  02-1234-1234
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className="text-white rounded bg-blue-500 px-[16px] py-[8px] text-sm"
              onClick={askPopup}
            >
              상품 문의 작성하기
            </button>
            <table className="w-full mt-4 text-[14px]">
              <tbody>
                <tr className="border-t border-t-blue--500 border-t-2  border-b-2  border-gray-300 text-center">
                  <th className="w-[100px] px-[12px] py-[10px]  border-gray-300">
                    답변상태
                  </th>
                  <th className="w-[500px] px-[12px] py-[10px]">문의내용</th>
                  <th className=" w-[150px] px-[12px] py-[10px]  border-gray-300">
                    작성자
                  </th>
                  <th className="w-[150px] px-[12px] py-[10px]">작성일</th>
                  <th className=" w-[100px] px-[12px] py-[10px]  border-gray-300">
                    삭제
                  </th>
                </tr>
                <Ask />
                <Ask />
                <Ask />
                <Ask />
                <Ask />
                <Ask />
                <Ask />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

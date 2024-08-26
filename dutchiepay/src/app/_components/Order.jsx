'use client';

import '../../styles/mypage.css';

import Image from 'next/image';
import Link from 'next/link';
import more from '../../../public/image/more.svg';
import product from '../../../public/image/product1.jpg';
import { useState } from 'react';

export default function Order() {
  const [isMore, setIsMore] = useState(false);
  const [status, setStatus] = useState('배송완료'); // 추후 데이터 들어올 때 값 변경 필요

  const handleIsMore = (e) => {
    setIsMore(!isMore);
  };

  return (
    <div className="w-[730px] relative flex flex-col gap-[8px]">
      <div className="flex">
        <strong>2024. 07. 21</strong>
        <p className="mypage-orders__order-number">24072112345</p>
      </div>
      <div className="flex gap-[16px]">
        <Image
          className="w-[140px] h-[140px] rounded-lg cursor-pointer"
          src={product}
          alt="애슐리 볶음밥"
          width={140}
          height={140}
        />
        <div className="h-[140px] flex flex-col gap-[4px] justify-center">
          <strong className="text-2xl text-blue--500">배송완료</strong>
          <Link href="#" className="max-w-[520px] product-name--single-line font-medium">
            애슐리 볶음밥 10인분 혼합 구성
            10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용
            직장인 도시락
          </Link>
          <div className="flex gap-[8px] items-center">
            <p className="text-lg font-bold">27,500원</p>
            <p className="text-sm text-gray--500">/ 1개</p>
          </div>
          <div className="flex gap-[8px]">
            {status === '공구실패' || status === '취소/환불' ? (
              <button className="text-white text-sm rounded px-[56px] py-[8px]" aria-hidden="true">
                버튼없음
              </button>
            ) : (
              <button className="text-white text-sm bg-blue-500 rounded px-[56px] py-[8px]">
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
              <button className="text-blue-500 text-sm border border-blue--500 rounded px-[56px] py-[8px]">
                환불/교환
              </button>
            )}
          </div>
        </div>
      </div>
      {isMore && (
        <div>
          <table class="mx-auto my-[16px] border border-collapse">
            <tr>
              <th className="mypage-order-details__table-header">배송지</th>
              <td className="flex flex-col mypage-order-details__table-data">
                <p className="font-bold">박용호</p>
                <p className="text-sm">010-8823-5776</p>
                <div className="flex gap-[8px]">
                  <p className="text-sm">서울특별시 송파구 올림픽로 84</p>
                  <p className="text-sm">201호</p>
                </div>
              </td>
            </tr>
            <tr>
              <th className="mypage-order-details__table-header">배송메시지</th>
              <td className="mypage-order-details__table-data">중앙현관 비밀번호는 1234입니다.</td>
            </tr>
            <tr>
              <th className="mypage-order-details__table-header">송장번호</th>
              <td className="mypage-order-details__table-data flex justify-between">
                <span class="tracking-number">1234567890</span>
                <button className="bg-blue--500 text-white text-xs px-[8px] py-[4px] rounded-md">배송조회</button>
              </td>
            </tr>
            <tr>
              <th className="mypage-order-details__table-header">결제정보</th>
              <td className="mypage-order-details__table-data flex flex-col gap-[16px]">
                <div>
                  <div className="flex justify-between">
                    <strong>주문 금액</strong>
                    <p className="text-blue--500 text-lg font-semibold">40,250원</p>
                  </div>
                  <div className="ml-[28px]">
                    <div className="flex justify-between">
                      <p className="text-sm">구매가격</p>
                      <p className="text-sm">57,500원</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">할인가격</p>
                      <p className="text-sm">17,250원</p>
                    </div>
                  </div>
                  <p className="ml-[28px] text-xs text-gray--500">가입 감사 쿠폰 (30% 할인)</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <strong>카드 결제</strong>
                    <p className="text-blue--500 text-lg font-semibold">40,250원</p>
                  </div>
                  <p class="ml-[28px] text-gray--500 text-sm">신한 1111 **** **** 일시불</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      )}

      <Image
        className={`w-[20px] h-[20px] absolute bottom-[8px] right-[20px] ${isMore ? 'rotate-180' : ''}`}
        src={more}
        alt="more"
        width={20}
        height={20}
        onClick={(e) => handleIsMore(e)}
      />
    </div>
  );
}

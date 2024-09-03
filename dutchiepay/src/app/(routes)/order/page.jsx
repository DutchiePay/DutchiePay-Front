'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';
import selectArrow from '../../../../public/image/selectArrow.svg';
import { useState } from 'react';

export default function Order() {
  const [isSelfMessage, setIsSelfMessage] = useState(false); // 배송 메시지 직접 입력 여부
  const [paymentMethod, setPaymentMethod] = useState('');

  /* 직접 입력 선택 시 true로 변경 */
  const handleSelectChange = (e) => {
    setIsSelfMessage(e.target.value === 'option5');
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.innerText);
  };

  const couponPopup = (e) => {
    e.preventDefault();
    window.open('/coupon', '_blank', 'width=620, height=670');
  };

  return (
    <main className="min-h-[750px] w-[1020px] mt-[40px] mb-[150px]">
      <section>
        <h1 className="text-3xl font-bold">주문/결제</h1>
        <p className="text-xs text-gray--500">
          ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
          가능합니다.
        </p>
        <table className="w-full mt-[40px] border border-collapse">
          <thead className="bg-gray--100 border-t border-b border-gray--200">
            <tr>
              <th className="w-[550px] py-[8px] px-[16px] text-start">
                상품정보
              </th>
              <th>판매가</th>
              <th>구매가</th>
              <th>수량</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[150px]">
              <td className="p-[12px] w-[550px] border">
                <div className="flex items-center gap-[12px]">
                  <Image
                    src={product}
                    alt="애슐리 볶음밥"
                    width={110}
                    height={110}
                  />
                  <div>
                    <p className="text-xs text-gray--500">
                      (주)이랜드팜앤푸드(서울)
                    </p>
                    <strong className="title--multi-line">
                      애슐리 볶음밥 10인분 혼합 구성
                      10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
                      대용 직장인 도시락
                    </strong>
                    <div className="flex items-center gapx-[8px] py-[4px] text-blue--700 text-sm font-semibold">
                      <Image src={clock} alt="남은시간" />
                      12일 08시간 36분 남음
                    </div>
                  </div>
                </div>
              </td>
              <td className="h-[150px] text-center font-bold border">
                30,000원
              </td>
              <td className="h-[150px] text-center font-bold border">
                <div>
                  <p className="text-xs text-gray--500 line-through">
                    30,000원
                  </p>
                  <strong className="text-red--500 font-bold">24,500원</strong>
                </div>
              </td>
              <td className="h-[150px] text-center border">1</td>
              <td className="h-[150px] text-center font-bold border">
                24,500원
              </td>
            </tr>
          </tbody>
        </table>
        <section className="mt-[40px] flex justify-between">
          <div className="w-[600px] flex flex-col gap-[32px]">
            <form className="flex flex-col gap-[8px]">
              <h2 className="text-2xl font-bold">주문자 정보</h2>
              <table className="border border-collapse">
                <tr className="border h-[60px]">
                  <th className="w-[120px] bg-gray--100">받는분</th>
                  <td className="px-[16px]">
                    <input
                      className="border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                      placeholder="받는분"
                    />
                  </td>
                </tr>
                <tr className="border h-[60px]">
                  <th className="w-[120px] bg-gray--100">연락처</th>
                  <td className="px-[16px]">
                    <input
                      className="border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                      placeholder="전화번호"
                    />
                  </td>
                </tr>
                <tr className="border h-[140px]">
                  <th className="w-[120px] bg-gray--100">주소</th>
                  <td className="px-[16px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex gap-[8px]">
                        <input
                          className="w-[70px] border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                          placeholder="우편번호"
                        />
                        <button className="px-[8px] text-white text-sm bg-blue--500 rounded-lg">
                          우편번호 찾기
                        </button>
                      </div>
                      <input
                        className="border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                        placeholder="주소"
                      />
                      <input
                        className="w-[300px] border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                        placeholder="상세 주소"
                      />
                    </div>
                  </td>
                </tr>
                <tr
                  className={`border ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}
                >
                  <th className="w-[120px] bg-gray--100">배송메시지</th>
                  <td
                    className={`flex flex-col justify-center gap-[8px] px-[16px] ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}
                  >
                    <div className="w-[400px] relative">
                      <select
                        className="select-no-arrow w-[400px] px-[8px] py-[4px] text-sm border rounded-lg outline-none"
                        onChange={handleSelectChange}
                      >
                        <option value="">배송메시지를 선택해주세요.</option>
                        <option value="option1">
                          문 앞에 놓아 주시면 돼요.
                        </option>
                        <option value="option2">
                          직접 받을게요. (부재시 문 앞)
                        </option>
                        <option value="option3">벨 누르지 말아주세요.</option>
                        <option value="option4">
                          배송 전에 미리 연락주세요.
                        </option>
                        <option value="option5">직접 입력하기</option>
                      </select>
                      <Image
                        className="w-[12px] h-[6px] absolute top-[12px] right-[10px] cursor-pointer pointer-events-none"
                        src={selectArrow}
                        alt="arrow"
                        width={12}
                        height={6}
                        aria-hidden="true"
                      />
                    </div>
                    {isSelfMessage && (
                      <input
                        className="w-full border rounded-lg px-[8px] py-[4px] text-sm outline-none"
                        placeholder="배송메시지"
                      />
                    )}
                  </td>
                </tr>
              </table>
            </form>
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[12px] items-center">
                <h2 className="text-2xl font-bold">쿠폰 적용</h2>
                <button
                  className="h-[28px] text-white text-sm bg-blue--500 rounded-lg px-[12px] flex justify-center items-center"
                  onClick={couponPopup}
                >
                  쿠폰 선택
                </button>
              </div>
              <input
                className="w-full text-sm p-[12px] rounded-lg"
                type="text"
                disabled={true}
                placeholder="쿠폰을 선택해주세요."
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-2xl font-bold">결제 수단 선택</h2>
              <div className="flex justify-between">
                <div
                  className={`product-order__button ${paymentMethod === '신용카드' && 'product-order__button__active'}`}
                  onClick={handlePaymentMethod}
                >
                  신용카드
                </div>
                <div
                  className={`product-order__button ${paymentMethod === '무통장 입금' && 'product-order__button__active'}`}
                  onClick={handlePaymentMethod}
                >
                  무통장 입금
                </div>
                <div
                  className={`product-order__button ${paymentMethod === '카카오페이' && 'product-order__button__active'}`}
                  onClick={handlePaymentMethod}
                >
                  카카오페이
                </div>
              </div>
            </div>
          </div>
          <div className="w-[400px]">
            <div className="flex flex-col gap-[8px]">
              <h2 className="text-2xl font-bold">결제 정보</h2>
              <div className="pt-[12px] flex flex-col gap-[12px] border rounded">
                <div className="flex justify-between px-[16px]">
                  <strong>판매가</strong>
                  <p>30,000원</p>
                </div>
                <div className="flex justify-between px-[16px]">
                  <strong>구매가</strong>
                  <p className="text-blue--500">24,500원</p>
                </div>
                <div className="flex justify-between px-[16px]">
                  <strong>수량</strong>
                  <p>1개</p>
                </div>
                <div className="flex justify-between px-[16px]">
                  <strong>배송비</strong>
                  <p>무료</p>
                </div>
                <div className="flex justify-between px-[16px]">
                  <strong>쿠폰할인</strong>
                  <p>
                    17,250원 <strong>(30% 할인)</strong>
                  </p>
                </div>
                <div className="h-[44px] px-[16px] flex justify-between items-center bg-gray--100">
                  <strong>최종 결제 금액</strong>
                  <p className="text-blue--500 font-bold">40,250원</p>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-[24px] py-[8px] bg-blue--500 text-white text-lg font-semibold rounded-lg"
              type="submit"
            >
              40,250원 ㆍ 결제하기
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

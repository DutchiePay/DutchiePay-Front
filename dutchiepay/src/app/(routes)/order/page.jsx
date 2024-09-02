import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';

export default function Order() {
  return (
    <main className="min-h-[750px] w-[1020px]">
      <section className="mt-[40px] mb-[100px]">
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
                    <div className="flex items-center gap-[4px] text-blue--700 text-sm font-semibold">
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
        <form className="w-[800px] mx-auto mt-[40px] flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-2xl font-bold">주문자 정보</h2>
            <div>주문자 정보 영역</div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[12px] items-center">
              <h2 className="text-2xl font-bold">쿠폰 적용</h2>
              <Link
                className="h-[28px] text-white text-sm bg-blue--500 rounded-lg px-[12px] flex justify-center items-center"
                href="/coupon"
                role="button"
              >
                쿠폰 선택
              </Link>
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
              <div className="product-order__button">신용카드</div>
              <div className="product-order__button">무통장 입금</div>
              <div className="product-order__button">카카오페이</div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-2xl font-bold">결제 정보</h2>
            <div>결제 정보 영역</div>
          </div>

          <button
            className="py-[8px] bg-blue--500 text-white text-lg font-semibold rounded-lg"
            type="submit"
          >
            40,250원 ㆍ 결제하기
          </button>
        </form>
      </section>
    </main>
  );
}

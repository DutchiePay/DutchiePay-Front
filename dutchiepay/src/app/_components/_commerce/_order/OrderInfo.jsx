import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import delivery from '/public/image/delivery.svg';
import product from '/public/image/product1.jpg';

export default function OrderInfo() {
  return (
    <table className="w-full mt-[40px] border border-collapse">
      <thead className="bg-gray--100 border-t border-b border-gray--200">
        <tr>
          <th className="w-[550px] py-[8px] px-[16px] text-start">상품정보</th>
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
                <div className="flex items-center gap-[8px] py-[4px] text-blue--700 text-sm font-semibold">
                  <Image src={delivery} alt="배송시작" width={20} height={20} />
                  12월 2일 이후 순차 발송 예정
                </div>
              </div>
            </div>
          </td>
          <td className="h-[150px] text-center font-bold border">30,000원</td>
          <td className="h-[150px] text-center font-bold border">
            <div>
              <p className="text-xs text-gray--500 line-through">30,000원</p>
              <strong className="text-red--500 font-bold">24,500원</strong>
            </div>
          </td>
          <td className="h-[150px] text-center border">1</td>
          <td className="h-[150px] text-center font-bold border">24,500원</td>
        </tr>
      </tbody>
    </table>
  );
}

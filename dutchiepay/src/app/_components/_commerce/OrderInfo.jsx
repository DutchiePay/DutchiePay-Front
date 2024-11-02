import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import delivery from '../../../../public/image/delivery.svg';
import product from '../../../../public/image/product1.jpg';

export default function OrderInfo({ orderInfo, quantity }) {
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
                src={orderInfo?.productImg}
                alt="결제 상품 이미지"
                width={110}
                height={110}
              />
              <div>
                <p className="text-xs text-gray--500">
                  (주)이랜드팜앤푸드(서울)
                </p>
                <strong className="title--multi-line">
                  {orderInfo?.productName}
                </strong>
                <div className="flex items-center gap-[8px] py-[4px] text-blue--700 text-sm font-semibold">
                  <Image src={delivery} alt="배송시작" width={20} height={20} />
                  {orderInfo?.expireDate} 이후 순차 발송 예정
                </div>
              </div>
            </div>
          </td>
          <td className="h-[150px] text-center font-bold border">
            {orderInfo?.originalPrice}
          </td>
          <td className="h-[150px] text-center font-bold border">
            <div>
              <p className="text-xs text-gray--500 line-through">
                {orderInfo?.originalPrice}
              </p>
              <strong className="text-red--500 font-bold">
                {orderInfo?.salePrice}
              </strong>
            </div>
          </td>
          <td className="h-[150px] text-center border">{quantity}</td>
          <td className="h-[150px] text-center font-bold border">
            {orderInfo?.salePrice * quantity}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

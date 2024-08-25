import "../../styles/mypage.css";

import Image from "next/image";
import mart from "../../../public/image/mart.jpg";
import comment from "../../../public/image/comment.svg";
export default function Product_Post() {
  return (
    <div className="w-[340px] h-[200px]  border px-[12px] py-[8px] flex flex-col gap-[4px] cursor-pointer m-0 m-auto rounded-[5px]">
      <p className="text-gray--500 text-[14px]  mt-[4px]">2024-12-21 까지</p>
      <p className="text-[20px] font-bold">신규 가입 감사 쿠폰</p>
      <div className="flex justify-end items-baseline ">
        <p className="text-[14px] text-blue--500 text-end mr-[10px]">
          총 금액에서
        </p>
        <p className="text-[32px] text-blue--500 text-end">15%</p>
      </div>
      <hr className="border-t-2 border-dashed border-gray-200 w-full my-2" />
      <div className="ml-[24px]">
        <p className="text-[12px] font-semibold text-gray--500">
          사용 가능 조건
        </p>
        <p className="text-[12px] font-semibold text-gray--500">
          주문 금액 15,000원 이상 시 사용 가능
        </p>
      </div>
    </div>
  );
}

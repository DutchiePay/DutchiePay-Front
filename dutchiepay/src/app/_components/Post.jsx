import "../../styles/mypage.css";

import Image from "next/image";
import mart from "../../../public/image/mart.jpg";
import comment from "../../../public/image/comment.svg";
export default function Post() {
  return (
    <div className="w-[172px] border px-[12px] py-[8px] flex flex-col gap-[4px] cursor-pointer">
      <div className="w-[148px] h-[120px] rounded-xl relative">
        <Image
          className="w-[150px] h-[120px] rounded-xl"
          src={mart}
          alt="마트/배달 기본 이미지"
          width={148}
          height={120}
        />
      </div>
      <p className="text-blue--500 text-[10px] font-bold mt-[4px]">마트배달</p>
      <p className="text-[14px] font-bold">
        효과적인 의사소통을 위한 비언어적 신호
      </p>
      <p className="text-[10px] mypage-likes__product-name ">
        자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이 블로그
        포스트에서는 일상 생활...
      </p>
      <div className="flex justify-between items-center">
        <p className="text-[12px] font-semibold">3시간전</p>
        <div className="flex items-center">
          <Image src={comment} width={15} height={15} alt="댓글 아이콘" />
          <p className="text-[12px] ml-[4px]">99+</p>
        </div>
      </div>
    </div>
  );
}

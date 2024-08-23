import Image from "next/image";
import logo from "../../../public/image/logo.jpg";
import search from "../../../public/image/search.svg";
import profile from "../../../public/image/profile.jpg";
import chat from "../../../public/image/chat.svg";
export default function Header() {
  return (
    <div className="w-[1020px] m-0 m-auto mt-[12px]">
      <div className="flex justify-end w-full ">
        <p className="mr-[4px] font-bold text-xs">한유진님</p>
        <p className="text-gray--500 text-xs">|</p>
        <p className="ml-[4px] mr-[4px] text-xs">로그아웃</p>
        <p className="text-gray--500 text-xs">|</p>
        <p className="ml-[4px] mr-[4px] text-xs">주문/배송</p>
        <p className="text-gray--500 text-xs">|</p>
        <p className="ml-[4px] text-xs">고객센터</p>
      </div>
      <div className="flex items-center relative w-full">
        <Image
          className="w-[160px] h-[96px] mr-[65px] "
          src={logo}
          alt="logo"
          width={160}
          height={96}
        ></Image>
        <div className="relative">
          <Image
            className="absolute pt-[13px] pb-[13px] ml-[20px]"
            src={search}
            width={16}
            height={16}
          ></Image>
          <input
            className="w-[600px] h-[42px] bg-gray--100 pt-[13px] pb-[13px] pl-[52px] border rounded-md"
            placeholder="검색어를 입력해주세요"
          ></input>
        </div>
        <div className="flex justify-end w-full">
          <Image
            className="w-[55px] h-[55px]"
            alt="chat"
            width={40}
            height={40}
            src={chat}
          ></Image>
          <Image
            className="w-[55px] h-[55px] rounded-full border ml-[18px]"
            src={profile}
            alt="profile"
            width={55}
            height={55}
          />
        </div>
      </div>
      <div className="flex justify-center h-[30px]">
        <div className=" ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <p className="font-bold">공동구매</p>
        </div>
        <div className=" ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <p className="font-bold">마트/배달</p>
        </div>
        <div className=" ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <p className="font-bold">거래/나눔</p>
        </div>
        <div className=" ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <p className="font-bold">커뮤니티</p>
        </div>
        <div className=" ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <p className="font-bold">이벤트</p>
        </div>
      </div>
    </div>
  );
}

import '../../../styles/header.css';

import Image from 'next/image';
import chat from '../../../../public/image/chat.svg';
import logo from '../../../../public/image/logo.jpg';
import profile from '../../../../public/image/profile.jpg';
import search from '../../../../public/image/search.svg';

export default function Header() {
  const isLoggedIn = true;
  return (
    <header className="w-[1020px] m-0 m-auto mt-[12px]">
      <nav className="flex justify-end w-full">
        <ul className="flex items-center">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="font-bold text-xs">한유진님</span>
              </li>
              <li className="nav-item">
                <button className="text-xs">로그아웃</button>
              </li>
              <li className="nav-item">
                <a href="#" className="text-xs">
                  주문/배송
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="text-xs">
                  고객센터
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a href="#" className="text-xs">
                  회원가입
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="text-xs">
                  로그인
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="text-xs">
                  고객센터
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center relative w-full mt-2">
        <Image className="w-[160px] h-[96px] mr-[65px]" src={logo} alt="logo" width={160} height={96} />
        <div className="relative">
          <Image
            className="absolute pt-[13px] pb-[13px] ml-[20px]"
            src={search}
            width={16}
            height={16}
            alt="search icon"
          />
          <input
            className="w-[600px] h-[42px] bg-gray--100 pt-[13px] pb-[13px] pl-[52px] border rounded-md outline-none placeholder:text-[14px]"
            placeholder="검색어를 입력해주세요"
          ></input>
        </div>

        {isLoggedIn && (
          <>
            <div className="flex justify-end w-full">
              <Image className="w-[55px] h-[55px]" alt="chat" width={40} height={40} src={chat} />
              <Image
                className="w-[55px] h-[55px] rounded-full border ml-[18px]"
                src={profile}
                alt="profile"
                width={55}
                height={55}
              />
            </div>
          </>
        )}
      </div>
      <ul className="flex justify-center h-[30px]">
        <li className="ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <a className="font-bold">공동구매</a>
        </li>
        <li className="ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <a className="font-bold">마트/배달</a>
        </li>
        <li className="ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <a className="font-bold">거래/나눔</a>
        </li>
        <li className="ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <a className="font-bold">커뮤니티</a>
        </li>
        <li className="ml-[42px] active:border-b-2 active:border-blue-500 cursor-pointer">
          <a className="font-bold">이벤트</a>
        </li>
      </ul>
    </header>
  );
}

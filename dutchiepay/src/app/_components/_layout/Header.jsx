'use client';

import '../../../styles/header.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import chat from '../../../../public/image/chat.svg';
import logo from '../../../../public/image/logo.jpg';
import { logout } from '@/redux/slice/loginSlice';
import profile from '../../../../public/image/profile.jpg';
import search from '../../../../public/image/search.svg';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = usePathname();
  const [filter, setFilter] = useState('');
  useEffect(() => {
    if (pathname.startsWith('/commerce')) {
      setFilter('공동구매');
    } else if (pathname.startsWith('/mart')) {
      setFilter('마트/배달');
    } else if (pathname.startsWith('/used')) {
      setFilter('거래/나눔');
    } else if (pathname.startsWith('/community')) {
      setFilter('커뮤니티');
    } else if (pathname.startsWith('/event')) {
      setFilter('이벤트');
    } else {
      setFilter('');
    }
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFilterClick = (filterName, route) => {
    setFilter(filterName);
    router.push(route);
  };

  return (
    <header className="w-[1020px] h-[165px]  bg-white fixed top-0 left-0 right-0 m-auto z-10">
      <nav className="flex justify-end w-full">
        <ul className="flex items-center">
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="font-bold text-xs">{user?.nickName || '사용자'}님</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="text-xs">
                  로그아웃
                </button>
              </li>
              <li className="nav-item">
                <Link href="/mypage/myorder" className="text-xs">
                  주문/배송
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/help" className="text-xs">
                  고객센터
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/signup" className="text-xs">
                  회원가입
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login" className="text-xs">
                  로그인
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/help" className="text-xs">
                  고객센터
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center relative w-full mt-2">
        <Link href="/" className="contents w-[160px]">
          <Image
            className="w-[160px] h-[96px] mr-[65px] cursor-pointer object-cotain"
            src={logo}
            alt="logo"
            width={160}
            height={96}
          />
        </Link>
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
          <div className="flex justify-end w-full">
            <Image className="w-[55px] h-[55px]" alt="chat" width={40} height={40} src={chat} />
            <Image
              className="w-[55px] h-[55px] rounded-full border ml-[18px]"
              src={user?.profileImage || profile}
              alt="profile"
              width={55}
              height={55}
            />
          </div>
        )}
      </div>

      <ul className="flex justify-center text-center w-[1020px] gap-[42px]">
        <li
          className={`cursor-pointer ${filter === '공동구매' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleFilterClick('공동구매', '/commerce')}
        >
          <span className="font-bold">공동구매</span>
        </li>
        <li
          className={`cursor-pointer ${filter === '마트/배달' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleFilterClick('마트/배달', '/mart')}
        >
          <span className="font-bold">마트/배달</span>
        </li>
        <li
          className={`cursor-pointer ${filter === '거래/나눔' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => handleFilterClick('거래/나눔', '/used')}
        >
          <span className="font-bold">거래/나눔</span>
        </li>
        <li
          className={`cursor-pointer ${filter === '커뮤니티' ? ' border-b-2 border-blue-500' : ''}`}
          onClick={() => handleFilterClick('커뮤니티', '/community')}
        >
          <span className="font-bold">커뮤니티</span>
        </li>
        <li
          className={`cursor-pointer ${filter === '이벤트' ? ' border-b-2 border-blue-500' : ''}`}
          onClick={() => handleFilterClick('이벤트', '/event')}
        >
          <span className="font-bold">이벤트</span>
        </li>
      </ul>
    </header>
  );
}

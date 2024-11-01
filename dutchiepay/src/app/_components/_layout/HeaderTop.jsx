'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Link from 'next/link';
import useLogout from '@/app/hooks/useLogout';
import { useSelector } from 'react-redux';

export default function HeaderTop() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  let accessToken = useSelector((state) => state.login.access);
  const handleLogout = useLogout(accessToken);

  return (
    <ul className="flex justify-end items-center mt-[4px] gap-[6px]">
      {isLoggedIn ? (
        <>
          <li className="nav-item">
            <span className="font-bold text-xs">{user?.nickname}님</span>
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
  );
}

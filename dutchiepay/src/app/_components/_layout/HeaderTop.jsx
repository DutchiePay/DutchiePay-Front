'use client';

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
          <li className="header-nav-item">
            <Link
              href={'/mypage'}
              className="font-bold text-xs hover:underline"
            >
              {user?.nickname}님
            </Link>
          </li>
          <li className="header-nav-item">
            <button onClick={handleLogout} className="text-xs hover:underline">
              로그아웃
            </button>
          </li>
          <li className="header-nav-item">
            <Link href="/mypage" className="text-xs hover:underline">
              마이페이지
            </Link>
          </li>
          <li className="header-nav-item">
            <Link href="/help" className="text-xs hover:underline">
              고객센터
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="header-nav-item">
            <Link href="/signup" className="text-xs hover:underline">
              회원가입
            </Link>
          </li>
          <li className="header-nav-item">
            <Link href="/login" className="text-xs hover:underline">
              로그인
            </Link>
          </li>
          <li className="header-nav-item">
            <Link href="/help" className="text-xs hover:underline">
              고객센터
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

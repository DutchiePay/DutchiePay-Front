'use client';

import '../../../styles/header.css';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'universal-cookie';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import chat from '../../../../public/image/chat.svg';
import { login } from '@/redux/slice/loginSlice';
import logo from '../../../../public/image/logo.jpg';
import profile from '../../../../public/image/profile.jpg';
import search from '../../../../public/image/search.svg';
import { setAddresses } from '@/redux/slice/addressSlice';
import useLogout from '@/app/hooks/useLogout';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  let accessToken = useSelector((state) => state.login.access);
  const addresses = useSelector((state) => state.address.addresses);
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = new Cookies();
  const pathname = usePathname();
  const handleLogout = useLogout(accessToken);

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const refresh = cookies.get('refresh');
    const handleRelogin = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/relogin`,
          { refresh: refresh }
        );

        const userInfo = {
          isLoggedIn: true,
          loginType: response.data.type || 'email',
          user: {
            userId: response.data.userId,
            nickname: response.data.nickname,
            profileImage: response.data.profileImg,
            location: response.data.location,
            isCertified: response.data.isCertified,
          },
          access: response.data.access,
        };
        localStorage.setItem('loginType', userInfo.loginType);
        dispatch(
          login({
            user: userInfo.user,
            access: userInfo.access,
          })
        );
        accessToken = userInfo.access;
      } catch (error) {
        if (
          error.response.data.message === '리프레시 토큰이 유효하지 않습니다.'
        ) {
          alert('자동로그인이 만료되었습니다. 다시 로그인해 주세요.');
          cookies.remove('refresh', { path: '/' });
        }
      }
    };

    if (refresh && !isLoggedIn) {
      handleRelogin();
    }
  }, []);

  // 필터를 useMemo로 메모이제이션하여 렌더링 최적화
  const filter = useMemo(() => {
    if (pathname.startsWith('/commerce')) return '공동구매';
    if (pathname.startsWith('/mart')) return '마트/배달';
    if (pathname.startsWith('/used')) return '거래/나눔';
    if (pathname.startsWith('/community')) return '커뮤니티';
    return '';
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/' && !isLoggedIn && addresses) {
      dispatch(setAddresses(null));
    }
  }, [isLoggedIn, pathname, addresses, dispatch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        router.push(`/search?keyword=${encodeURIComponent(e.target.value)}`);
      }
    },
    [router]
  );

  // pathname이 변경될 때만 실행되는 useEffect
  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      setKeyword('');
    }
  }, [pathname]);

  return (
    <header className="fixed h-[154px] top-0 left-0 right-0 z-10 w-full bg-white shadow">
      <div className="container mx-auto w-[1020px]">
        <nav className="flex justify-end w-full mt-[4px]">
          <ul className="flex items-center gap-[6px]">
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
        </nav>
        <div className="flex items-center relative w-full">
          <Link href="/" className="contents w-[160px]">
            <Image
              className="w-[160px] h-[96px] mr-[65px] cursor-pointer object-contain"
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
              alt="search"
            />
            <input
              className="w-[600px] h-[42px] bg-gray--100 pt-[13px] pb-[13px] pl-[52px] border rounded-md outline-none placeholder:text-[14px]"
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {isLoggedIn && (
            <div className="flex justify-end w-full">
              <Image
                className="w-[55px] h-[55px]"
                alt="chat"
                width={40}
                height={40}
                src={chat}
              />
              <div className="relative w-[55px] h-[55px] ml-[18px] cursor-pointer">
                <Image
                  className="rounded-full border"
                  src={user?.profileImage || profile}
                  alt="profile"
                  fill
                  style={{ objectFit: 'cover' }}
                  onClick={() => router.push('/mypage')}
                />
              </div>
            </div>
          )}
        </div>

        <ul className="flex justify-center text-center w-[1020px] gap-[60px] mb-[4px]">
          <li
            className={`cursor-pointer hover:text-blue--500 ${
              filter === '공동구매' ? ' text-blue-500' : ''
            }`}
          >
            <Link href="/commerce" className="font-bold">
              공동구매
            </Link>
          </li>
          <li
            className={`cursor-pointer hover:text-blue--500  ${
              filter === '마트/배달' ? ' text-blue-500' : ''
            }`}
          >
            <Link href="/mart" className="font-bold">
              마트/배달
            </Link>
          </li>
          <li
            className={`cursor-pointer hover:text-blue--500 ${
              filter === '거래/나눔' ? ' text-blue-500' : ''
            }`}
          >
            <Link href="/used" className="font-bold">
              거래/나눔
            </Link>
          </li>
          <li
            className={`cursor-pointer hover:text-blue--500 ${
              filter === '커뮤니티' ? ' text-blue-500' : ''
            }`}
          >
            <Link href="/community" className="font-bold">
              커뮤니티
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

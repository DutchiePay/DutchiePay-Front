'use client';

import '@/styles/header.css';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'universal-cookie';
import HeaderTop from './HeaderTop';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import SearchInput from './SearchInput';
import axios from 'axios';
import chat from '/public/image/chat.svg';
import { login } from '@/redux/slice/loginSlice';
import logo from '/public/image/logo.jpg';
import { logout } from '@/redux/slice/loginSlice';
import profile from '/public/image/profile.jpg';
import { setAddresses } from '@/redux/slice/addressSlice';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  const addresses = useSelector((state) => state.address.addresses);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleRelogin = useCallback(async () => {
    const cookies = new Cookies();
    const refresh = cookies.get('refresh');

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
    } catch (error) {
      if (
        error.response.data.message === '리프레시 토큰이 유효하지 않습니다.'
      ) {
        alert('자동로그인이 만료되었습니다. 다시 로그인해 주세요.');
        cookies.remove('refresh', { path: '/' });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('dutchie-rememberMe') && !access) {
      handleRelogin();
    }
  }, [access, handleRelogin]);

  // tab 간 데이터 동기화
  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    if (!access && !localStorage.getItem('dutchie-rememberMe')) {
      channel.postMessage({ type: 'sync-request' });
    }

    channel.onmessage = (e) => {
      const { type, data } = e.data;

      if (type === 'sync-request' && access) {
        const sharedData = {
          user,
          access: access,
        };
        channel.postMessage({ type: 'sync-data', data: sharedData });
      } else if (type === 'sync-data' && !access) {
        dispatch(
          login({
            user: data.user,
            access: data.access,
          })
        );
      } else if (type === 'logout-event' && access) {
        dispatch(logout());
      }
    };

    return () => {
      channel.close();
    };
  }, [dispatch, access, user]);

  useEffect(() => {
    if (pathname === '/' && !isLoggedIn && addresses) {
      dispatch(setAddresses(null));
    }
  }, [isLoggedIn, pathname, addresses, dispatch]);

  return (
    <header className="fixed h-[154px] top-0 left-0 right-0 z-10 w-full bg-white shadow">
      <div className=" mx-auto w-[1020px]">
        <HeaderTop />
        <div className="flex items-center relative w-full">
          <Link href="/" className="contents w-[160px]">
            <Image
              className="w-[160px] h-[96px] mr-[65px] cursor-pointer object-contain"
              src={logo}
              alt="logo"
              width={160}
              height={96}
              priority
            />
          </Link>
          <SearchInput />

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
        <Nav />
      </div>
    </header>
  );
}

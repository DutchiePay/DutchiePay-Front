'use client';

import '@/styles/header.css';

import { useDispatch, useSelector } from 'react-redux';

import HeaderMain from './HeaderMain';
import HeaderTop from './HeaderTop';
import Nav from './Nav';
import { login } from '@/redux/slice/loginSlice';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useRelogin from '@/app/hooks/useRelogin';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  const addresses = useSelector((state) => state.address.addresses);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const relogin = useRelogin();

  useEffect(() => {
    if (localStorage.getItem('dutchie-rememberMe') && !access) {
      relogin();
    }
  }, [access, relogin]);

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
      } else if (type === 'login-event') {
        dispatch(
          login({
            user: data.user,
            access: data.access,
          })
        );
      } else if (type === 'change-address') {
        dispatch(setAddresses(data));
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
        <HeaderMain profileImage={user?.profileImage} />
        <Nav />
      </div>
    </header>
  );
}

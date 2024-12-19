'use client';

import { Provider, useDispatch, useSelector } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { redirect, usePathname } from 'next/navigation';

import Floating from './_components/_layout/Floating';
import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { PersistGate } from 'redux-persist/integration/react';
import UpDownButton from './_components/_layout/UpDownButton';
import { login } from '@/redux/slice/loginSlice';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useEffect } from 'react';
import useRelogin from '@/app/hooks/useRelogin';

export default function RootLayoutClient({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </PersistGate>
    </Provider>
  );
}

function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isCertified = useSelector((state) => state.login.user.isCertified);
  const rhideHeader = pathname.match(
    /\/(login|reset|find|signup|ask|report|cancel|refund|review|coupon|change-number|delivery-address|withdraw-auth)/
  );
  const rhideFooter = pathname.match(
    /\/(ask|report|cancel|refund|review|coupon|change-number|delivery-address|withdraw-auth)/
  );
  const rhideFloating = pathname.match(
    /\/(login|find|signup|ask|report|cancel|refund|review|coupon|change-number|delivery-address|extra-info|withdraw-auth)/
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (isLoggedIn && !isCertified) {
      // 사용자가 extra-info 페이지로 리다이렉션
      if (!pathname.startsWith('/extra-info')) {
        redirect('/extra-info');
      }
    }
  }, [isLoggedIn, isCertified, pathname]);

  const user = useSelector((state) => state.login.user);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
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

  return (
    <>
      {!rhideHeader && <Header />}
      <main
        className={`w-[1020px] flex mx-auto ${!rhideHeader ? 'mt-[105px]' : ''}`}
      >
        {children}
        {!rhideFloating && <Floating />}
        {!rhideFloating && <UpDownButton />}
      </main>
      {!rhideFooter && <Footer />}
    </>
  );
}

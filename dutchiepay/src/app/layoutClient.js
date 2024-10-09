'use client';

import '../styles/globals.css';

import { Provider, useSelector } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { redirect, usePathname, useRouter } from 'next/navigation';

import Floating from './_components/_layout/Floating';
import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { PersistGate } from 'redux-persist/integration/react';
import UpDownButton from './_components/_layout/UpDownButton';
import { useEffect } from 'react';

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
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isCertified = useSelector((state) => state.login.user.isCertified);

  const rhideHeader = pathname.match(
    /\/(login|reset|find|signup|ask|report|cancel|refund|review|coupon|change-number|delivery-address)/
  );
  const rhideFooter = pathname.match(
    /\/(ask|report|cancel|refund|review|coupon|change-number|delivery-address)/
  );
  const rhideFloating = pathname.match(
    /\/(login|find|signup|ask|report|cancel|refund|review|coupon|change-number|delivery-address|extra-info)/
  );

  useEffect(() => {
    if (isLoggedIn && !isCertified) {
      // 사용자가 extra-info 페이지로 리다이렉션
      if (!pathname.startsWith('/extra-info')) {
        redirect('/extra-info');
      }
    }
  }, [isLoggedIn, isCertified, pathname, router]);

  return (
    <>
      {!rhideHeader && <Header />}
      <main className={`layout ${!rhideHeader ? 'mt-[155px]' : ''}`}>
        {children}
        {!rhideFloating && <Floating />}
        {!rhideFloating && <UpDownButton />}
      </main>
      {!rhideFooter && <Footer />}
    </>
  );
}

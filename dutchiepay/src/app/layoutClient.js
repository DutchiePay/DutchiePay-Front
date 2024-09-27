'use client';

import '../styles/globals.css';

import { persistor, store } from '@/redux/store';

import Floating from './_components/_layout/Floating';
import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import UpDownButton from './_components/_layout/UpDownButton';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  const rhideHeader = pathname.match(
    /\/(login|reset|find|signup|ask|report|cancel|refund|review|coupon|change-number)/
  );
  const rhideFooter = pathname.match(
    /\/(ask|report|cancel|refund|review|coupon|change-number)/
  );
  const rhideFloating = pathname.match(
    /\/(login|find|signup|ask|report|cancel|refund|review|coupon|change-number)/
  );

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!rhideHeader && <Header />}

        <main className={`layout ${!rhideHeader ? 'mt-[155px]' : ''}`}>
          {children}
          {!rhideFloating && <Floating />}
          <UpDownButton />
        </main>
        {!rhideFooter && <Footer />}
      </PersistGate>
    </Provider>
  );
}

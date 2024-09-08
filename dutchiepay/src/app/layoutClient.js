'use client';

import '../styles/globals.css';

import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { usePathname } from 'next/navigation';
import Floating from './_components/_layout/Floating';
import UpDownButton from './_components/_layout/UpDownButton';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  const rhideHeader = pathname.match(
    /\/(login|reset|find|signup|ask|report|cancel|refund|review|coupon)/
  );
  const rhideFooter = pathname.match(
    /\/(ask|report|cancel|refund|review|coupon)/
  );
  const rhideFloating = pathname.match(/\/(login|find|signup)/);
  return (
    <Provider store={store}>
      {!rhideHeader && <Header />}

      <main className={`layout ${!rhideHeader ? 'mt-[155px]' : ''}`}>
        {children}
        {!rhideFloating && <Floating />}
        <UpDownButton />
      </main>
      {!rhideFooter && <Footer />}
    </Provider>
  );
}

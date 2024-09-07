'use client';

import '../styles/globals.css';

import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  const rhideHeader = pathname.match(
    /\/(login|reset|find|signup|ask|report|cancel|refund|review|coupon)/
  );
  const rhideFooter = pathname.match(
    /\/(ask|report|cancel|refund|review|coupon)/
  );

  return (
    <Provider store={store}>
      {!rhideHeader && <Header />}
      <main className={`layout ${!rhideHeader && 'mt-[155px]'}`}>
        {children}
      </main>
      {!rhideFooter && <Footer />}
    </Provider>
  );
}

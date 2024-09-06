'use client';

import '../styles/globals.css';

import Footer from './_components/_layout/Footer';
import Header from './_components/_layout/Header';
import { Provider } from 'react-redux';
import Sidebar from './_components/_layout/Sidebar';
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
  const rshowSidebar = pathname.startsWith('/mypage');

  return (
    <Provider store={store}>
      {!rhideHeader && <Header />}
      <div className={`layout ${!rhideHeader && 'mt-[155px]'}`}>
        {rshowSidebar && <Sidebar />}
        <main className="layout__main">{children}</main>
      </div>
      {!rhideFooter && <Footer />}
    </Provider>
  );
}

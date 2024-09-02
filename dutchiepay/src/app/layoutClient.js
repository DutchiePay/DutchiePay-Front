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
    /\/(login|reset|find|signup|ask|report|cancel|refund)/
  );
  const rhideFooter = pathname.match(/\/(ask|report|cancel|refund)/);
  const rshowSidebar = pathname.startsWith('/mypage');

  const layoutStyle = {
    marginTop: rhideHeader ? '0px' : '158px',
  };

  return (
    <Provider store={store}>
      {!rhideHeader && <Header />}
      <div className="layout" style={layoutStyle}>
        {rshowSidebar && <Sidebar />}
        <main className="layout__main">{children}</main>
      </div>
      {!rhideFooter && <Footer />}
    </Provider>
  );
}

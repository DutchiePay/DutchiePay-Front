'use client';

import '../styles/globals.css';

import Header from './_components/_layout/Header';
import { Provider } from 'react-redux';
import Sidebar from './_components/_layout/Sidebar';
import store from '@/redux/store';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  //(locationNow.pathname.match(/\/(login|reset|find|auth|signup)/))
  const hideHeader = pathname === '/login' || pathname === '/signup' || pathname === '/find' || pathname === '/reset';
  const showSidebar = pathname.startsWith('/mypage');
  return (
    <Provider store={store}>
      {!hideHeader && <Header />}
      <div className="layout">
        {showSidebar && <Sidebar />}
        <main className="layout__main">{children}</main>
      </div>
    </Provider>
  );
}

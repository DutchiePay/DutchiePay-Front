'use client';

import '../styles/globals.css';

import Header from './_components/_layout/Header';
import { Provider } from 'react-redux';
import Sidebar from './_components/_layout/Sidebar';
import store from '@/redux/store';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  const hideHeader = pathname.match(/\/(login|reset|find|signup)/);
  const showSidebar = pathname.startsWith('/mypage');

  const layoutStyle = {
    marginTop: hideHeader ? '0px' : '158px',
  };

  return (
    <Provider store={store}>
      {!hideHeader && <Header />}
      <div className="layout" style={layoutStyle}>
        {showSidebar && <Sidebar />}
        <main className="layout__main">{children}</main>
      </div>
    </Provider>
  );
}

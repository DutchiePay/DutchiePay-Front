'use client';

import '../styles/globals.css';

import Header from './_components/_layout/Header';
import Sidebar from './_components/_layout/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  //(locationNow.pathname.match(/\/(login|reset|find|auth|signup)/))
  const hideHeader = pathname === '/login' || pathname === '/signup' || pathname === '/find' || pathname === '/reset';
  const showSidebar = pathname.startsWith('/mypage');
  return (
    <>
      {!hideHeader && <Header />} {/* 조건부로 Header 렌더링 */}
      <div className="layout">
        {showSidebar && <Sidebar />} {/* 조건부로 Sidebar 렌더링 */}
        <main className="layout__main">{children}</main>
      </div>
    </>
  );
}

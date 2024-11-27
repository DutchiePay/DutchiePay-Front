'use client';

import '@/styles/header.css';

import HeaderMain from './HeaderMain';
import HeaderTop from './HeaderTop';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="fixed h-[154px] top-0 left-0 right-0 z-20 w-full bg-white shadow">
      <div className=" mx-auto w-[1020px]">
        <HeaderTop />
        <HeaderMain />
        <Nav />
      </div>
    </header>
  );
}

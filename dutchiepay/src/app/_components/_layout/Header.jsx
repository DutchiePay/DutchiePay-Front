'use client';

import HeaderMain from './HeaderMain';
import HeaderTop from './HeaderTop';

export default function Header() {
  return (
    <header className="fixed h-[105px] top-0 left-0 right-0 z-20 w-full bg-white shadow">
      <div className=" mx-auto w-[1020px]">
        <HeaderTop />
        <HeaderMain />
      </div>
    </header>
  );
}

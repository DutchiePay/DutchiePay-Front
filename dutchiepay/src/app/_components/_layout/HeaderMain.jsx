'use client';

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import logo from '/public/image/logo.jpg';

export default function HeaderMain() {
  return (
    <div className="flex justify-between items-end mt-[12px] relative w-[1020px]">
      <Link href="/" className="contents w-[160px]">
        <Image
          className="w-[170px] h-[60px] cursor-pointer object-contain"
          src={logo}
          alt="logo"
          width={170}
          height={60}
          priority
        />
      </Link>
      <Nav />
    </div>
  );
}

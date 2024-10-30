'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-center text-center w-[1020px] gap-[60px] mb-[4px]">
        <li
          className={`cursor-pointer hover:text-blue--500 ${
            pathname.startsWith('/commerce') ? ' text-blue-500' : ''
          }`}
        >
          <Link href="/commerce" className="font-bold">
            공동구매
          </Link>
        </li>
        <li
          className={`cursor-pointer hover:text-blue--500  ${
            pathname.startsWith('/mart') ? ' text-blue-500' : ''
          }`}
        >
          <Link href="/mart" className="font-bold">
            마트/배달
          </Link>
        </li>
        <li
          className={`cursor-pointer hover:text-blue--500 ${
            pathname.startsWith('/used') ? ' text-blue-500' : ''
          }`}
        >
          <Link href="/used" className="font-bold">
            거래/나눔
          </Link>
        </li>
        <li
          className={`cursor-pointer hover:text-blue--500 ${
            pathname.startsWith('/community') ? ' text-blue-500' : ''
          }`}
        >
          <Link href="/community" className="font-bold">
            커뮤니티
          </Link>
        </li>
      </ul>
    </nav>
  );
}

'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Link from 'next/link';
import { MENUS } from '@/app/_util/constants';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-center text-center w-[1020px] gap-[60px] mb-[4px]">
        {Object.entries(MENUS).map(([key, value]) => (
          <li
            className={`cursor-pointer hover:text-blue--500 ${
              pathname.startsWith(`/${value}`) ? ' text-blue-500' : ''
            }`}
            key={key}
          >
            <Link className="font-bold" href={`/${value}`}>
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

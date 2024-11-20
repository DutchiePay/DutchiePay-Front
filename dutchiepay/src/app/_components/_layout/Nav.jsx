'use client';

import '@/styles/globals.css';

import HeaderHoverNav from './HeaderHoverNav';
import Link from 'next/link';
import { MENUS } from '@/app/_util/constants';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  return (
    <div className="relative">
      <nav>
        <ul className="flex justify-center text-center w-[1020px] gap-[60px] mb-[4px] relative z-50">
          {Object.entries(MENUS).map(([key, value]) => (
            <li
              className={`cursor-pointer hover:text-blue--500 px-1 ${
                pathname.startsWith(`/${value}`) ? ' text-blue-500' : ''
              }`}
              key={key}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link className="font-bold" href={`/${value}`}>
                {key}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {(isHovered || isNavHovered) && (
        <div className="absolute top-[99%] left-28 w-full">
          <HeaderHoverNav setIsNavHovered={setIsNavHovered} />
        </div>
      )}
    </div>
  );
}

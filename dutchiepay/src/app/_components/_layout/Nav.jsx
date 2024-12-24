'use client';

import Link from 'next/link';
import { MENUS } from '@/app/_util/constants';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const HeaderHoverNav = dynamic(() => import('./HeaderHoverNav'));

export default function Nav() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [currentHover, setIsCurrentHover] = useState('');

  return (
    <div className="relative">
      <nav>
        <ul className="flex justify-center text-center gap-[60px] mb-[4px] relative z-50">
          {Object.entries(MENUS).map(([key, value]) => (
            <li
              className={`cursor-pointer hover:text-blue--500 px-1 ${
                pathname.startsWith(`/${value}`) ? ' text-blue-500' : ''
              }`}
              key={key}
              onMouseEnter={() => {
                setIsHovered(true);
                setIsCurrentHover(key);
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link className="font-bold" href={`/${value}`}>
                {key}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {currentHover !== '상품검색' && (isHovered || isNavHovered) && (
        <div
          className={`absolute top-[86%] ${currentHover === '공동구매' ? 'left-[90px]' : currentHover === '마트/배달' ? 'left-[220px]' : currentHover === '거래/나눔' ? 'left-[350px]' : 'left-[470px]'} w-full `}
        >
          <HeaderHoverNav
            setIsNavHovered={setIsNavHovered}
            menu={currentHover}
          />
        </div>
      )}
    </div>
  );
}

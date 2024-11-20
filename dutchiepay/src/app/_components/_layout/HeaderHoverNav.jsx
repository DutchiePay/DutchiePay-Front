'use client';

import '@/styles/globals.css';

import { CATEGORIES } from '@/app/_util/constants';
import Link from 'next/link';

export default function HeaderHoverNav({ setIsNavHovered }) {
  const mart = ['전체', '마트구매', '같이배달'];
  const used = ['전체', '중고판매', '중고나눔'];
  const community = ['전체', '정보공유', '질문', '취미생활', '자유게시판'];

  return (
    <div
      className="w-3/5 h-[400px] px-10 border bg-white drop-shadow flex items-start z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <ul className="min-w-[132px] h-full pt-3 flex flex-col items-center gap-2 text-sm border-x">
        {Object.keys(CATEGORIES).map((item, key) => {
          return (
            <li
              className="hover:underline hover:text-blue--500 hover:font-semibold"
              key={key}
            >
              <Link
                href={`/commerce${CATEGORIES[item] ? `?category=${CATEGORIES[item]}` : ''}`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
      {[mart, used, community].map((menu, key) => {
        return (
          <ul
            className="min-w-[132px] h-full pt-3 flex flex-col items-center gap-2 text-sm border-r"
            key={key}
          >
            {menu.map((category, key) => {
              return (
                <li
                  className="hover:underline hover:text-blue--500 hover:font-semibold"
                  key={key}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

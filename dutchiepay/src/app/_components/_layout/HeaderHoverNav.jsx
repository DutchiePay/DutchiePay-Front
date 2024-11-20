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
      className="w-4/5 px-[166px] border py-5 bg-white drop-shadow flex gap-12 items-start z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <ul className="min-w-20 flex flex-col justify-center items-center gap-2 text-sm">
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
      <ul className="min-w-20 flex flex-col justify-center items-center gap-2 text-sm">
        {mart.map((item, key) => {
          return (
            <li
              className="hover:underline hover:text-blue--500 hover:font-semibold"
              key={key}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <ul className="min-w-20 flex flex-col justify-center items-center gap-2 text-sm">
        {used.map((item, key) => {
          return (
            <li
              className="hover:underline hover:text-blue--500 hover:font-semibold"
              key={key}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <ul className="min-w-20 flex flex-col justify-center items-center gap-2 text-sm">
        {community.map((item, key) => {
          return (
            <li
              className="hover:underline hover:text-blue--500 hover:font-semibold"
              key={key}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

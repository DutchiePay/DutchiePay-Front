'use client';

import '@/styles/globals.css';

import {
  CATEGORIES,
  COMMUNITY_CATEGORIES,
  MART_CATEGORIES,
  USED_CATEGORIES,
} from '@/app/_util/constants';

import Link from 'next/link';

export default function HeaderHoverNav({ setIsNavHovered, menu }) {
  const selectedMenu =
    menu === '마트/배달'
      ? MART_CATEGORIES
      : menu === '커뮤니티'
        ? COMMUNITY_CATEGORIES
        : menu === '거래/나눔'
          ? USED_CATEGORIES
          : null;

  const selectedURL =
    menu === '마트/배달'
      ? 'mart'
      : menu === '커뮤니티'
        ? 'community'
        : menu === '거래/나눔'
          ? 'used'
          : null;

  return (
    <div
      className="relative w-32 border bg-white drop-shadow flex justify-center items-start z-50"
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      {menu === '공동구매' ? (
        <ul className="py-3 flex flex-col items-center gap-3 text-sm">
          {Object.keys(CATEGORIES).map((item, key) => (
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
          ))}
        </ul>
      ) : (
        selectedMenu && (
          <ul className="py-3 flex flex-col items-center gap-3 text-sm">
            {Object.keys(selectedMenu).map((category, key) => (
              <li
                className="hover:underline hover:text-blue--500 hover:font-semibold"
                key={key}
              >
                <Link
                  href={`/${selectedURL}${selectedMenu[category] ? `?category=${selectedMenu[category]}` : ''}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

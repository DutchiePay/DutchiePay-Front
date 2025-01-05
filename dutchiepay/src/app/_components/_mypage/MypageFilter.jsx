'use client';

import '@/styles/globals.css';

export default function MypageFilter({ filter, setFilter, filterkey }) {
  return (
    <li
      className={`py-[6px] px-[12px] text-blue--500 text-sm border border-blue--500 rounded-2xl transition-all duration-300 ease-in-out ${filter === filterkey ? `text-white bg-blue--500` : ''}`}
      onClick={() => setFilter(filterkey)}
      role="button"
    >
      {filterkey}
    </li>
  );
}

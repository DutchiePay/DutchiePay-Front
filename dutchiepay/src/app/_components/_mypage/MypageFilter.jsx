'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

export default function MypageFilter({ filter, setFilter, filterkey }) {
  return (
    <li
      className={`mypage__filter ${filter === filterkey ? `mypage__filter--selected` : ''}`}
      onClick={() => setFilter(filterkey)}
      role="button"
    >
      {filterkey}
    </li>
  );
}

'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

export default function ProductFilter({ filter, setFilter }) {
  return (
    <ul className="flex">
      <li
        className={`fillter__item ${filter === '최신순' ? 'fillter__item--selected' : ''}`}
        onClick={() => setFilter('최신순')}
      >
        최신순
      </li>
      <li
        className={`fillter__item ${filter === '마감임박순' ? 'fillter__item--selected' : ''}`}
        onClick={() => setFilter('마감임박순')}
      >
        마감임박순
      </li>
      <li
        className={`fillter__item ${filter === '좋아요순' ? 'fillter__item--selected' : ''}`}
        onClick={() => setFilter('좋아요순')}
      >
        좋아요순
      </li>
      <li
        className={`fillter__item ${filter === '할인율순' ? 'fillter__item--selected' : ''}`}
        onClick={() => setFilter('할인율순')}
      >
        할인율순
      </li>
    </ul>
  );
}

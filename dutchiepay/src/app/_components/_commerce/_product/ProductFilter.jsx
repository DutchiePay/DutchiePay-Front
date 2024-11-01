'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { COMMERCE_FILTER } from '@/app/_util/constants';

export default function ProductFilter({ filter, setFilter }) {
  return (
    <ul className="flex">
      {Object.keys(COMMERCE_FILTER).map((key) => (
        <li
          key={key}
          className={`fillter__item ${filter === key ? 'fillter__item--selected' : ''}`}
          onClick={() => setFilter(key)}
        >
          {key}
        </li>
      ))}
    </ul>
  );
}

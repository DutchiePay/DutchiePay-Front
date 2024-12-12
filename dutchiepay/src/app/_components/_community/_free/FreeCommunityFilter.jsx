'use client';

import '@/styles/globals.css';
import '@/styles/community.css';
import { COMMUNITY_FILTER } from '@/app/_util/constants';

export default function FreeCommunityFilter({ filter, setFilter }) {
  return (
    <ul className="flex">
      {Object.keys(COMMUNITY_FILTER).map((key) => (
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

import '@/styles/globals.css';
import '@/styles/mypage.css';

import { ORDER_FILTER } from '@/app/_util/constants';

export default function OrderFilter({ filter, setFilter }) {
  return (
    <ul className="flex gap-[8px] my-[16px]">
      <li>
        <button
          className={`mypage__filter ${filter === '전체' ? `mypage__filter--selected` : ''}`}
          onClick={() => setFilter('전체')}
        >
          전체
        </button>
      </li>
      {Object.keys(ORDER_FILTER).map((value, key) => (
        <li key={key}>
          <button
            className={`mypage__filter ${filter === value ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter(value)}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}

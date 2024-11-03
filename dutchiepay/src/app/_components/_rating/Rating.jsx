import { useEffect, useState } from 'react';

import getStarRates from '@/app/_util/getStarRates';

export default function Rating({ rating, size }) {
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setRatesResArr(getStarRates({ rating }));
  }, [rating]);

  return (
    <div className="flex justify-center items-center gap-[2px]">
      {STAR_IDX_ARR.map((item, idx) => {
        const clipId = `clip-${idx}-${rating}`; // SVG의 고유 ID가 충돌되지 않도록 함
        const pathId = `path-${idx}-${rating}`; // SVG의 고유 ID가 충돌되지 않도록 함

        return (
          <span key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={clipId}>
                <rect width={ratesResArr[idx]} height={size} />
              </clipPath>
              <path
                id={pathId}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${clipId})`}
                href={`#${pathId}`}
                fill="#FFBF0F"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

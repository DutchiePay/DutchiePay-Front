import { useEffect, useState } from 'react';

export default function Rating({ rating, size }) {
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = rating;

    for (let i = 0; i < 5; i++) {
      if (starVerScore >= 1) {
        tempStarRatesArr[i] = 14; // 별 하나당 14
        starVerScore -= 1;
      } else {
        tempStarRatesArr[i] = starVerScore * 14; // 부분 채우기
        break;
      }
    }

    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates());
  }, [rating]);

  return (
    <div className="flex justify-center items-center gap-[2px]">
      {STAR_IDX_ARR.map((item, idx) => {
        const clipId = `clip-${idx}-${rating}`; // SVG의 고유 ID가 충돌되지 않도록 함
        const pathId = `path-${idx}-${rating}`; // SVG의 고유 ID가 충돌되지 않도록 함

        return (
          <span key={`${item}_${idx}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 13" fill="#cacaca">
              <clipPath id={clipId}>
                <rect width={ratesResArr[idx]} height={size} />
              </clipPath>
              <path
                id={pathId}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use clipPath={`url(#${clipId})`} href={`#${pathId}`} fill="#4B70F5" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

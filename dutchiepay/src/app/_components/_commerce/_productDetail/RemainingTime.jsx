import { useEffect, useState } from 'react';

import getRemainingTime from '@/app/_util/getRemainingTime';

export default function RemainingTime({ endTime, isEnd, setIsEnd }) {
  const [remainingTime, setRemainingTime] = useState(''); // 남은 시간

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining = getRemainingTime(endTime);
      setRemainingTime(remaining);

      // 마감 시간이 지났다면 타이머를 멈춘다.
      if (remaining === '마감된 공구 입니다.') {
        setIsEnd(true);
        clearInterval(intervalId);
      }
    };

    if (isEnd) updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId); // 언마운트 시 타이머 정리
  }, [endTime]);

  return <p>{remainingTime}</p>;
}

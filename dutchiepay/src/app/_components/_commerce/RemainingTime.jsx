import { useEffect, useState } from 'react';

export default function RemainingTime({ endTime }) {
  const [remainingTime, setRemainingTime] = useState(''); // 남은 시간

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const distance = new Date(endTime) - now;

    if (distance <= 0) {
      return '마감된 공구 입니다.';
    }

    const timeUnits = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };

    return `${timeUnits.days}일 ${timeUnits.hours}시간 ${timeUnits.minutes}분 ${timeUnits.seconds}초 남음`;
  };

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining = calculateRemainingTime(endTime);
      setRemainingTime(remaining);

      // 마감 시간이 지났다면 타이머를 멈춘다.
      if (remaining === '마감된 공구 입니다.') {
        clearInterval(intervalId);
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId); // 언마운트 시 타이머 정리
  }, [endTime]);

  return <p>{remainingTime}</p>;
}

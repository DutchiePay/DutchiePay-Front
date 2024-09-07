import { useEffect, useState } from 'react';

export default function RemainingTime({ endTime }) {
  const [remainingTime, setRemainingTime] = useState(''); // 남은 시간

  const endTimestamp = new Date(endTime).getTime();

  const calculateRemainingTime = (endTimestamp) => {
    const now = new Date().getTime();
    const distance = endTimestamp - now;

    if (distance <= 0) {
      return '마감된 공구 입니다.';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  };

  useEffect(() => {
    // 남은 시간이 없는 경우, 즉 마감 시간이 지났을 경우
    if (new Date().getTime() >= endTimestamp) {
      setRemainingTime('마감된 공구 입니다.');
      return; // 더 이상 타이머를 설정하지 않음
    }

    const updateRemainingTime = () => {
      setRemainingTime(calculateRemainingTime(endTimestamp));
    };
    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [endTimestamp]);

  return <p>{remainingTime}</p>;
}

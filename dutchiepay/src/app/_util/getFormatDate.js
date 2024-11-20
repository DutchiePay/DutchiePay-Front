const getFormatDate = (type, dateString) => {
  const date = new Date(dateString);
  const localDate = convertToKST(date);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  switch (type) {
    case 'ask':
      return `${year}.${month}.${day}`;
    case 'review':
      return `${year}년 ${month}월 ${day}일`;
    case 'myask':
      return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
    default:
      return ''; // 기본값
  }
};

const convertToKST = (date) => {
  const utcOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
  return new Date(date.getTime() + utcOffset);
};

const getRemainingTime = (hasSecond, endTime) => {
  const now = new Date();
  const endDate = new Date(`${endTime}T23:59:59+09:00`);
  const distance = endDate - now;

  if (distance <= 0) {
    return '마감된 공구 입니다.';
  }

  const timeUnits = calculateTimeUnits(distance);
  return `${timeUnits.days}일 ${timeUnits.hours}시간 ${timeUnits.minutes}분${hasSecond ? ` ${timeUnits.seconds}초` : ''} 남음`;
};

const calculateTimeUnits = (distance) => {
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

export { getFormatDate, getRemainingTime };

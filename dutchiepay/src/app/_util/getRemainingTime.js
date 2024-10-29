export default function getRemainingTime(endTime) {
  const now = new Date();
  const endDate = new Date(`${endTime}T00:00:00Z`);
  const distance = endDate - now;

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
}

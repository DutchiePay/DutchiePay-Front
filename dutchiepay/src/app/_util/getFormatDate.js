const getFormatDate = (type, dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  switch (type) {
    case 'ask':
      return `${year}.${month}.${day}`;
    case 'review':
      return `${year}년 ${month}월 ${day}일`;
    case 'myask':
    case 'comment':
      return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
    default:
      return ''; // 기본값
  }
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

const getPostDate = (dateString, type = 'default') => {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const formattedDate = formatter.format(date);

  const [year, month, day, hour, minute] = formattedDate.split(/[^0-9]+/);
  const ampm = date.getHours() >= 12 ? '오후' : '오전';

  if (type === 'default')
    return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}:${minute}`;
  else return `${year}년 ${month}월 ${day}일`;
};

const getStringDateToTimeStamp = (date) => {
  const [monthDay, dayOfWeek, weekDay, ampm, time] = date.split(' ');
  const [month, day] = [
    monthDay.replace('월', ''),
    dayOfWeek.replace('일', ''),
  ];
  let [hours, minutes] = time.split(':').map(Number);

  if (ampm === '오후' && hours < 12) hours += 12;
  const formattedDate = new Date(new Date().getFullYear(), month - 1, day)
    .toISOString()
    .split('T')[0];
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
const getformatCahtDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};
const getformatCahtTime = (date) => {
  return `${date.getHours() > 12 ? '오후' : '오전'} ${date.getHours() % 12}:${String(date.getMinutes()).padStart(2, '0')}`;
};
export {
  getFormatDate,
  getRemainingTime,
  getPostDate,
  getStringDateToTimeStamp,
  getformatCahtTime,
  getformatCahtDate,
};

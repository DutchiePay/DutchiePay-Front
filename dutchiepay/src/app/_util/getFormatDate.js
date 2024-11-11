const getFormatDate = (type, dateString) => {
  const date = new Date(dateString);

  // 한국 시간으로 변환
  const utcOffset = 9 * 60; // KST는 UTC+9
  const localDate = new Date(date.getTime() + utcOffset * 60 * 1000);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');

  if (type === 'ask') {
    return `${year}.${month}.${day}`;
  } else if (type === 'review') {
    return `${year}년 ${month}월 ${day}일`;
  } else if (type === 'myask') {
    return `${year}. ${month}. ${day}. ${hours}:${minutes}`;
  }

  return ''; // 기본값
};

export default getFormatDate;

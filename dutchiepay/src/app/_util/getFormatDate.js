const getFormatDate = (type, dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (type === 'ask') {
    return `${year}.${month}.${day}`;
  } else if (type === 'review') {
    return `${year}년 ${month}월 ${day}일`;
  }

  return ''; // 기본값
};

export default getFormatDate;

import { useEffect, useState } from 'react';

const useDate = (dateString) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // 유효성 검사
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // 유효한 날짜인지 확인
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, '0');

      setFormattedDate(`${year}.${month}.${day}`);
    } else {
      console.error('유효하지 않은 날짜입니다:', dateString);
      setFormattedDate(''); // 유효하지 않은 경우 빈 문자열로 설정
    }
  }, []); // dateString이 변경될 때마다 실행

  return formattedDate;
};

export default useDate;

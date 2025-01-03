import { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';

const useFetchAlarms = (access) => {
  const [alarms, setAlarms] = useState([]);
  const hasFetched = useRef(false);
  const { refreshAccessToken } = useReissueToken();

  const fetchAlarms = useCallback(async () => {
    try {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      setAlarms(response.data);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        hasFetched.current = false;
        if (reissueResponse.success) {
          await fetchAlarms();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [access, refreshAccessToken]);

  return { alarms, fetchAlarms };
};

export default useFetchAlarms;

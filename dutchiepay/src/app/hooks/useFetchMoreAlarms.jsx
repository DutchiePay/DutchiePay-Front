import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

const useFetchMoreAlarms = (id) => {
  const access = useSelector((state) => state.login.access);
  const [moreAlarms, setMoreAlarms] = useState([]);
  const hasFetched = useRef(false);
  const { refreshAccessToken } = useReissueToken();
  useEffect(() => {
    const fetchAlarms = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      if (!id) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notice?noticeId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setMoreAlarms(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchAlarms();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchAlarms();
  }, [access, id]);

  return moreAlarms;
};

export default useFetchMoreAlarms;

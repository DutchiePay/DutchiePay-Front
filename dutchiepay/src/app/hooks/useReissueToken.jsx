import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import axios from 'axios';
import { setAccessToken } from '@/redux/slice/loginSlice';

const useReissueToken = () => {
  const cookies = new Cookies();
  const access = useSelector((state) => state.login.access);
  const refresh = cookies.get('refresh');
  const dispatch = useDispatch();

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reissue`,
        {
          access: access,
          refresh: refresh,
        }
      );

      dispatch(setAccessToken({ access: response.data.access }));
    } catch (error) {
      alert('오류가 발생하여 로그아웃 처리 되었습니다');
    }
  }, [access, dispatch, refresh]);

  useEffect(() => {
    refreshAccessToken();
  }, [refreshAccessToken]);

  return null;
};

export default useReissueToken;

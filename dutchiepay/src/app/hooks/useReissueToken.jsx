import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { setAccessToken } from '@/redux/slice/loginSlice';
import { useCallback } from 'react';
import useClearUserData from './useClearUserData';

const useReissueToken = () => {
  const accessToken = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const clearUserData = useClearUserData();
  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reissue`,
        {
          access: accessToken,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setAccessToken({ access: response.data.access }));

      return { success: true };
    } catch (error) {
      let message;
      if (error.response) {
        if (
          error.response.data.message ===
            '리프레시 토큰이 유효하지 않습니다.' ||
          error.response.data.message === '리프레시 토큰을 입력해주세요.'
        ) {
          clearUserData();
          message = '로그인 유지 시간이 만료되어 로그아웃됩니다.';
        }
      } else {
        message = '오류가 발생했습니다. 다시 시도해주세요.';
      }
      return { success: false, message };
    }
  }, [accessToken, dispatch, clearUserData]);

  return { refreshAccessToken };
};

export default useReissueToken;

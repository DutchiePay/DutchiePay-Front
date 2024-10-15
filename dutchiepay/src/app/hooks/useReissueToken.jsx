import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '@/redux/slice/loginSlice';
import Cookies from 'universal-cookie';
const useReissueToken = () => {
  const cookies = new Cookies();
  const accessToken = useSelector((state) => state.login.access);
  const refresh = cookies.get('refresh');
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reissue`,
        {
          access: accessToken,
          refresh: refresh,
        }
      );

      dispatch(setAccessToken({ access: response.data.access }));
    } catch (error) {
      alert('새로운 accecc토큰 생성 중 에러가 발생했습니다.');
    }
  };
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return null;
};

export default useReissueToken;

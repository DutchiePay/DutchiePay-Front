import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '@/redux/slice/loginSlice';

const useReissueToken = (refreshToken) => {
  const accessToken = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  console.log(refreshToken);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/reissue`,
        {
          access: accessToken,
          refresh: refreshToken,
        }
      );
      dispatch(setAccessToken(response.data.access));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (refreshToken) {
      refreshAccessToken();
    }
  }, [refreshToken]);

  return null;
};

export default useReissueToken;

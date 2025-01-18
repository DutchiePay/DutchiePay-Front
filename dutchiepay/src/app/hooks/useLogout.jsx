import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useCallback, useRef } from 'react';
import useClearUserData from './useClearUserData';
import { useDispatch } from 'react-redux';
import useReissueToken from './useReissueToken';
import { useRouter } from 'next/navigation';

const useLogout = (accessToken) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const clearUserData = useClearUserData();
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const handleLogout = useCallback(async () => {
    try {
      if (hasFetched.current) return;
      hasFetched.current = true;
      router.push('/');
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      clearUserData();
      setTimeout(() => {
        dispatch(logout());
        dispatch(setAddresses(null));
      }, 0);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        hasFetched.current = false;
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          return await handleLogout();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert(
          reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  }, [dispatch, accessToken, router, clearUserData]);

  return handleLogout;
};

export default useLogout;

import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useCallback } from 'react';
import useClearUserData from './useClearUserData';
import { useDispatch } from 'react-redux';
import useReissueToken from './useReissueToken';
import { useRouter } from 'next/navigation';

const useLogout = (accessToken) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const clearUserData = useClearUserData();
  const { refreshAccessToken } = useReissueToken();
  const handleLogout = useCallback(async () => {
    try {
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
      // 액세스 토큰 만료 시 리프레시 토큰 발급 시도
      /*const reissueResponse = await refreshAccessToken();
      if (reissueResponse.success) {
        // 리프레시 토큰이 성공적으로 발급되면 로그아웃을 다시 시도
        handleLogout();
      } else {
        alert(
          reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
        );
      }*/
    }
  }, [dispatch, accessToken, router, clearUserData]);

  return handleLogout;
};

export default useLogout;

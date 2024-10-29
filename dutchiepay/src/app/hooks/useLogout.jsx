import Cookies from 'universal-cookie';
import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const useLogout = (accessToken) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const cookies = new Cookies();
      dispatch(logout());
      cookies.remove('refresh', { path: '/' });
      sessionStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  }, [dispatch, accessToken, router]);

  return handleLogout;
};

export default useLogout;

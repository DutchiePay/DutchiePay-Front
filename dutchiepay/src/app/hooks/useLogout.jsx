import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/slice/loginSlice';
import Cookies from 'universal-cookie';

const useLogout = (accessToken) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cookies = new Cookies();
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
      console.log('logout');

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

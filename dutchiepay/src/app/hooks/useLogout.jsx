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

      dispatch(logout());
      const cookies = new Cookies();
      cookies.remove('refresh', { path: '/' });
      sessionStorage.removeItem('user');
      localStorage.setItem('logout-event', '1');
      localStorage.removeItem('logout-event');
      localStorage.removeItem('dutchie-rememberMe');
      router.push('/');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [dispatch, accessToken, router]);

  return handleLogout;
};

export default useLogout;

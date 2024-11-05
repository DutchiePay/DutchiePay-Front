import Cookies from 'universal-cookie';
import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const useLogout = (accessToken) => {
  const dispatch = useDispatch();
  const router = useRouter();

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

      const cookies = new Cookies();
      cookies.remove('refresh', { path: '/' });
      localStorage.removeItem('dutchie-rememberMe');
      sessionStorage.removeItem('user');

      const channel = new BroadcastChannel('auth-channel');
      channel.postMessage({ type: 'logout-event' });
      channel.close();

      setTimeout(() => {
        dispatch(logout());
        dispatch(setAddresses(null));
      }, 0);
    } catch (error) {
      console.log(error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [dispatch, accessToken, router]);

  return handleLogout;
};

export default useLogout;

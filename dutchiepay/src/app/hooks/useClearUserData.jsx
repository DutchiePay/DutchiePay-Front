import Cookies from 'universal-cookie';
import { logout } from '@/redux/slice/loginSlice';
import { setAddresses } from '@/redux/slice/addressSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const useClearUserData = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const clearUserData = () => {
    router.push('/');
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
  };

  return clearUserData;
};

export default useClearUserData;

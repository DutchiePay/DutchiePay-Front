import Cookies from 'universal-cookie';
import { login } from '@/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';

export default function useLogin() {
  const dispatch = useDispatch();

  const handleLogin = ({
    userInfo,
    access,
    loginType,
    isRelogin,
    isRemeberMe,
    refresh = null,
  }) => {
    localStorage.setItem('loginType', loginType || 'email');
    if (!isRelogin) {
      const cookies = new Cookies();
      const expires = isRemeberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : undefined;
      cookies.set('refresh', refresh, { path: '/', expires });
    }

    dispatch(
      login({
        user: userInfo,
        access: access,
      })
    );

    const channel = new BroadcastChannel('auth-channel');
    channel.postMessage({
      type: 'login-event',
      data: {
        user: userInfo,
        access: access,
      },
    });
    channel.close();
  };

  return handleLogin;
}

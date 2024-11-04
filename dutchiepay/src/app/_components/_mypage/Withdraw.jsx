import '@/styles/mypage.css';

import { useCallback, useEffect } from 'react';

import Cookies from 'universal-cookie';
import { logout } from '@/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Withdraw() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenAuthPhone = () => {
    window.open(
      '/withdraw-auth',
      '회원탈퇴',
      'width=620, height=400, location=1'
    );
  };

  const handleMessage = useCallback(
    (event) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'WITHDRAW'
      ) {
        dispatch(logout());
        const cookies = new Cookies();
        cookies.remove('refresh', { path: '/' });
        localStorage.removeItem('dutchie-rememberMe');
        sessionStorage.removeItem('user');

        const channel = new BroadcastChannel('auth-channel');
        channel.postMessage({ type: 'logout-event' });
        channel.close();

        router.push('/');
      }
    },
    [router, dispatch]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <button
      className="flex justify-end text-[14px] text-gray--500 hover:underline"
      onClick={handleOpenAuthPhone}
    >
      회원탈퇴
    </button>
  );
}

import '@/styles/mypage.css';

import { useSelector } from 'react-redux';

import useLogout from '@/app/hooks/useLogout';

export default function Withdraw() {
  const access = useSelector((state) => state.login.access);
  const handleLogout = useLogout(access);
  const handleOpenAuthPhone = () => {
    const authWindow = window.open(
      '/auth-phone',
      '회원탈퇴',
      'width=620, height=400, location=1'
    );

    // 부모 창에서 메시지를 수신하여 로그아웃 처리
    const handleMessage = (event) => {
      if (
        event.origin === window.location.origin &&
        event.data.type === 'LOGOUT'
      ) {
        handleLogout();
        authWindow.close(); // 인증 창을 닫습니다.
      }
    };

    window.addEventListener('message', handleMessage);
  };

  return (
    <button
      className="flex justify-end text-[14px] text-gray--500 hover:underline"
      onClick={handleOpenAuthPhone}
    >
      회원탈퇴
    </button>
  );
}

import '@/styles/mypage.css';

import { useCallback, useEffect } from 'react';

import useClearUserData from '@/app/hooks/useClearUserData';

export default function Withdraw() {
  const clearUserData = useClearUserData();
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
        clearUserData();
      }
    },
    [clearUserData]
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

'use client';

import { useEffect } from 'react';

export default function ModifyNumber({ userInfo, setUserInfo }) {
  // 휴대폰 번호 변경 체크
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data && event.data.type === 'UPDATE_PHONE') {
        setUserInfo((prev) => ({
          ...prev,
          phone: event.data.phone,
        }));

        const user = JSON.parse(sessionStorage.getItem('user'));
        user.phone = event.data.phone;
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [setUserInfo]);

  return (
    <article className="flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="w-[130px] font-semibold text-2xl">전화번호</h2>
        <p className="text-lg">{userInfo.phone}</p>
      </div>
      <button
        className="min-w-[80px] p-[8px] border border-gray--200 rounded-lg"
        onClick={() => {
          window.open(
            '/change-number',
            '휴대폰 번호 변경',
            'width=620, height=670, location=1'
          );
        }}
      >
        변경
      </button>
    </article>
  );
}

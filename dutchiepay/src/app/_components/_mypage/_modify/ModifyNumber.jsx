'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

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
  }, []);

  return (
    <article className="mypage-profile">
      <div className="flex items-center">
        <h2 className="mypage-profile__label">전화번호</h2>
        <p className="mypage-profile__value">{userInfo.phone}</p>
      </div>
      <button
        className="mypage-profile__button"
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

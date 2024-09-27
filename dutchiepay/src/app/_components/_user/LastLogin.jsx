import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

export default function LastLogin({ type }) {
  const [loginType, setLoginType] = useState(''); // email/kakao/naver

  useEffect(() => {
    const storedLoginType = localStorage.getItem('loginType');
    setLoginType(storedLoginType || '');
  }, []);

  return (
    <>
      {loginType === type && (
        <div
          className="user-last__login user-last__login--naver"
          onClick={() => console.log(loginType)}
        >
          <div
            className="absolute w-[50px] h-[50px] top-[0px] left-[30%] bg-white z-[-1]"
            aria-hidden={!loginType === type}
          >
            {/* 말풍선꼬리 */}
          </div>
          <strong>마지막</strong>으로
          <br />
          로그인한 방식
        </div>
      )}
    </>
  );
}

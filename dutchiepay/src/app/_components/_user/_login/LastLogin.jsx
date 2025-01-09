'use client';

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
        <div className="w-[120px] absolute bg-white top-full left-[-50%] mt-[4px] border rounded-lg px-[12px] py-[8px] text-center text-sm z-30">
          <strong>마지막</strong>으로
          <br />
          로그인한 방식
        </div>
      )}
    </>
  );
}

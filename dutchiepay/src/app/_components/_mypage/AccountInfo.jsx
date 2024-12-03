'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import kakao from '/public/image/kakao.png';
import naver from '/public/image/naver.png';

export default function AccountInfo({ userInfo }) {
  const [loginType, setLoginType] = useState(''); // email/kakao/naver

  useEffect(() => {
    const storedLoginType = localStorage.getItem('loginType');
    setLoginType(storedLoginType || '');
  }, []);

  return (
    <article className="flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="w-[130px] font-semibold text-2xl">계정정보</h2>
        {loginType === 'email' ? (
          <p className="text-lg">{userInfo.email}</p>
        ) : loginType === 'kakao' ? (
          <div className="flex items-center gap-[12px]">
            <Image
              className="w-[28px] h-[28px] rounded-full"
              src={kakao}
              alt="kakao"
              width={30}
              height={30}
            />
            <p>카카오 연동중</p>
          </div>
        ) : (
          <div className="flex items-center gap-[12px]">
            <Image
              className="w-[28px] h-[28px] rounded-full"
              src={naver}
              alt="naver"
              width={30}
              height={30}
            />
            <p>네이버 연동중</p>
          </div>
        )}
      </div>
      {loginType === 'email' && (
        <Link
          href="/reset"
          className="min-w-[100px] py-[8px] px-[12px] border border-gray--200 rounded-lg"
          role="button"
        >
          비밀번호 변경
        </Link>
      )}
    </article>
  );
}

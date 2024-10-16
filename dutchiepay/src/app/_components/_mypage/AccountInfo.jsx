'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

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
    <article className="mypage-profile">
      <div className="flex items-center">
        <h2 className="mypage-profile__label">계정정보</h2>
        {loginType === 'email' ? (
          <p className="mypage-profile__value">{userInfo.email}</p>
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
          className="mypage-profile__button-reset"
          role="button"
        >
          비밀번호 변경
        </Link>
      )}
    </article>
  );
}

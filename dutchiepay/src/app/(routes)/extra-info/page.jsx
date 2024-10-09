'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import AddInfoSubmit from '@/app/_components/_user/AddInfoSubmit';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ExtraInfo() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isCertified = useSelector((state) => state.login.user.isCertified);
  const router = useRouter();

  /*useEffect(() => {
    if ((isCertified && isLoggedIn) || !isLoggedIn) {
      alert('잘못된 접근 방식');
      router.push('/');
    }
  }, []);*/

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[735px]">
      <section className="flex flex-col w-[500px]">
        <h1 className="text-4xl font-bold">추가 정보 입력</h1>
        <p className="mt-[12px] mb-[24px]">
          가입하신 계정의 <strong>지역</strong>과 <strong>휴대폰 번호</strong>
          로 인증해주시면
          <br />
          정상적으로 더취페이를 <strong>이용</strong> 하실 수 있습니다.
        </p>
        <AddInfoSubmit />
      </section>
    </section>
  );
}

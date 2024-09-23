'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import Link from 'next/link';
import ResetSubmit from '@/app/_components/_user/ResetSubmit';
import logo from '../../../../public/image/logo.jpg';
import { useEffect } from 'react';

export default function Reset() {
  useEffect(() => {
    const email = sessionStorage.getItem('emailForReset');
    console.log(email);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[890px]">
      <h1>
        <Link href="/">
          <Image
            className="w-[200px] h-[120px] mb-[16px]"
            src={logo}
            alt="더취페이"
            width={200}
            height={120}
          />
        </Link>
      </h1>
      <section className="flex flex-col w-[500px]">
        <h2 className="text-2xl font-bold">비밀번호 재설정</h2>
        <p className="text-sm">
          비밀번호 재설정을 위해 <strong>새 비밀번호</strong>를 입력하고
          &apos;재설정&apos; 버튼을 눌러주세요.
        </p>
        <ResetSubmit />
      </section>
    </section>
  );
}

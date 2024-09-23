'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import Link from 'next/link';
import SignUpSubmit from '@/app/_components/_user/SignUpSubmit';
import SocialSignup from '@/app/_components/_user/SocialSignup';
import logo from '../../../../public/image/logo.jpg';

export default function Signup() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[880px]">
      <Link href="/" className="mt-[80px]">
        <Image
          className="w-[200px] h-[120px] mb-[8px]"
          src={logo}
          alt="logo"
          width={200}
          height={120}
        />
      </Link>
      <h2 className="text-[20px] font-bold text-start w-[500px] mb-[16px]">
        간편 회원가입
      </h2>
      <section className="w-[500px]">
        <SocialSignup />
        <hr className="w-[500px] my-[10px] border-t-[2px] border-gray--300" />
        <SignUpSubmit />
        <div className="flex flex-col">
          <Link
            href="/"
            className="text-gray--500 text-sm text-center mt-[8px] underline"
            role="button"
          >
            메인으로 돌아가기
          </Link>
          <small className="text-red--400 text-center mb-[80px]">
            메인으로 돌아갈 경우, 지금까지 작성한 내용은 복구할 수 없습니다
          </small>
        </div>
      </section>
    </section>
  );
}

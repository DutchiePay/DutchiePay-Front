'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import FindSuccess from '@/app/_components/FindSuccess';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useSearchParams } from 'next/navigation';

export default function Reset() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (email) setIsUser(false);
  }, [email]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[890px]">
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
        <p className="text-xs">새로운 비밀번호로 재설정해주세요.</p>
        <form className="flex flex-col gap-[32px] mt-[40px]">
          <div className="flex flex-col gap-[8px]">
            <label className="user__label">새 비밀번호</label>
            <input className="user__input-password" type="password" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="user__label">비밀번호 확인</label>
            <input className="user__input-password" type="password" />
          </div>

          <button className="user__button-blue" type="submit">
            비밀번호 재설정
          </button>
        </form>
      </section>
    </main>
  );
}

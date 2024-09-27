'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import FindSubmit from '@/app/_components/_user/FindSubmit';
import FindSuccess from '@/app/_components/_user/FindSuccess';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useState } from 'react';

export default function Find() {
  const [tab, setTab] = useState('아이디(이메일) 찾기');
  const [isFindEmail, setIsFindEmail] = useState('');

  const handleTab = (e) => {
    setTab(e.target.innerText);
    setIsFindEmail('');
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[995px]">
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
      <div className="flex justify-center">
        <div
          className={`user-find__header ${tab === '아이디(이메일) 찾기' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          아이디(이메일) 찾기
        </div>
        <div
          className={`user-find__header ${tab === '비밀번호 재설정' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          비밀번호 재설정
        </div>
      </div>
      <section className="mb-[32px] w-[500px]">
        {isFindEmail ? (
          <FindSuccess isFindEmail={isFindEmail} />
        ) : (
          <FindSubmit tab={tab} setIsFindEmail={setIsFindEmail} />
        )}
      </section>
    </section>
  );
}

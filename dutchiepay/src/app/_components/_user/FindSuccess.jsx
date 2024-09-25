'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useState } from 'react';

export default function FindSuccess({ isFindEmail }) {
  return (
    <section className="mb-[32px] w-[500px] min-h-[340px]">
      <p className="my-[40px]">
        입력하신 휴대폰 정보와 일치하는 <strong>아이디(이메일)</strong> 입니다.
      </p>
      <p className="text-center text-xl">
        아이디: <strong>{isFindEmail}</strong>
      </p>
      <div className="flex items-center justify-center mt-[60px]">
        <Link
          href="/"
          className="rounded mr-[24px] px-[16px] py-[12px] w-[174px] bg-blue--500 text-white flex justify-center"
          role="button"
        >
          메인으로 이동
        </Link>
        <Link
          href="/login"
          className="border border-blue--500 rounded px-[16px] py-[12px] w-[174px] bg-white text-blue--500 flex justify-center"
          role="button"
        >
          로그인으로 이동
        </Link>
      </div>
    </section>
  );
}

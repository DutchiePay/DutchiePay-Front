'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import kakao from '../../../../public/image/kakao.png';
import naver from '../../../../public/image/naver.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'universal-cookie';

export default function SocialSignup() {
  const router = useRouter();
  const cookie = new Cookies();

  return (
    <div className="flex gap-[20px] h-[70px]">
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/signup?type=naver`}
        className="user-signup__button bg-[#00c73c] text-white"
      >
        <Image src={naver} width={40} height={40} alt="naver" />
        <p>네이버로 시작하기</p>
      </Link>
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/signup?type=kakao`}
        className="user-signup__button bg-[#FBDB44]"
      >
        <Image src={kakao} width={40} height={40} alt="kakao" />
        <span>카카오로 시작하기</span>
      </Link>
      <button onClick={()=>console.log(cookie.get('token'))}>test</button>
    </div>
  );
}

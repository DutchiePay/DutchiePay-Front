import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import LastLogin from './LastLogin';
import kakao from '../../../../public/image/kakao.png';
import naver from '../../../../public/image/naver.png';

export default function SocialLogin() {
  return (
    <section>
      <h2 className="user-login-sns__title">&nbsp;SNS 계정으로 로그인&nbsp;</h2>
      <div className="flex mt-[24px] gap-[60px] items-center justify-center">
        <button className="relative">
          <Image
            className="w-[60px] h-[60px] cursor-pointer"
            src={naver}
            alt="naver"
          />
          <LastLogin type={'naver'} />
        </button>
        <button className="relative">
          <Image
            className="w-[60px] h-[60px] cursor-pointer"
            src={kakao}
            alt="kakao"
          />
          <LastLogin type={'kakao'} />
        </button>
      </div>
    </section>
  );
}

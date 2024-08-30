'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';
import kakao from '../../../../public/image/kakao.png';
import logo from '../../../../public/image/logo.jpg';
import naver from '../../../../public/image/naver.png';
import { useState } from 'react';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const loginType = 'naver';

  const handleCilckEyeIcon = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <main className="min-h-[890px] flex items-center justify-center">
      <div className="flex flex-col gap-[16px] justify-center items-center">
        <Link href="/">
          <Image className="w-[200px] h-[120px] mb-[16px]" src={logo} alt="logo" width={200} height={120} />
        </Link>

        <section className="text-center mb-[32px] w-[450px]">
          <form>
            {/* 리액트 훅 폼 적용시 변경 예정*/}
            <div className="mb-[16px]">
              <input className="user__input" placeholder="아이디" type="text" />
            </div>

            <div className="mb-[16px] flex relative">
              <input className="user__input-password" placeholder="비밀번호" type={isVisible ? 'text' : 'password'} />
              <Image
                className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                src={isVisible ? eyeOpen : eyeClosed}
                alt="eyes"
                onClick={handleCilckEyeIcon}
              />
            </div>

            <div className="flex flex-col gap-[8px]">
              <button type="submit" className="user__button-blue">
                로그인
              </button>
              <Link href="/signup" className="user__button-white">
                회원가입
              </Link>
            </div>

            <div className="flex justify-between items-center mt-[8px] mb-[32px]">
              <div className="flex items-center gap-[8px]">
                <input type="checkbox" className="login__checkbox" />
                <label className="text-gray--500 text-sm">자동 로그인</label>
              </div>
              <Link href="/find" className="text-sm text-gray--500 hover:text-black">
                아이디/비밀번호 찾기
              </Link>
            </div>
          </form>

          <section>
            <h2 className="user-login-sns__title">&nbsp;SNS 계정으로 로그인&nbsp;</h2>
            <div className="flex mt-[24px] gap-[60px] items-center justify-center">
              <div className="relative">
                <Image className="w-[60px] h-[60px] cursor-pointer" src={naver} alt="naver" />
                {loginType === 'naver' && (
                  <div className="user-last__login user-last__login--naver">
                    <strong>마지막</strong>으로
                    <br />
                    로그인한 방식
                  </div>
                )}
              </div>
              <div className="relative">
                <Image className="w-[60px] h-[60px] cursor-pointer" src={kakao} alt="kakao" />
                {loginType === 'kakao' && (
                  <div className="user-last__login user-last__login--kakao">
                    <strong>마지막</strong>으로
                    <br /> 로그인한 방식
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

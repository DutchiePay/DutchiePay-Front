'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';
import kakao from '../../../../public/image/kakao.png';
import logo from '../../../../public/image/logo.jpg';
import naver from '../../../../public/image/naver.png';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const loginType = 'naver';

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm({
    mode: 'onSubmit',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const handleCilckEyeIcon = () => {
    setIsVisible((prev) => !prev);
  };

  const password = watch('password');

  const onSubmit = async (formData) => {
    const { ...userData } = formData;
    const payload = {
      ...userData,
    };
    console.log(payload);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <main className="w-full min-h-[890px] flex items-center justify-center">
      <div className="flex flex-col gap-[16px] justify-center items-center">
        <Link href="/">
          <Image
            className="w-[200px] h-[120px] mb-[16px]"
            src={logo}
            alt="logo"
            width={200}
            height={120}
          />
        </Link>

        <section className="text-center mb-[32px] w-[450px]">
          <form onSubmit={handleSubmit(onSubmit)} onKeyUp={handleEnter}>
            <div className="mb-[8px]">
              <input
                className="user__input mt-[4px]"
                placeholder="이메일"
                type="text"
                {...register('email', {
                  required: true,
                })}
              />
            </div>

            <div className="flex relative">
              <input
                className="user__input-password mt-[4px]"
                placeholder="비밀번호"
                type={isVisible ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                })}
              />
              {password && (
                <Image
                  className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                  src={isVisible ? eyeOpen : eyeClosed}
                  alt="eyes"
                  onClick={handleCilckEyeIcon}
                />
              )}
            </div>

            <p
              className={`text-sm min-h-[20px] mt-[8px] text-red--500 text-start font-medium`}
            >
              {isSubmitted && (errors.email || errors.password)
                ? '아이디/비밀번호를 입력해주세요'
                : ''}
            </p>
            <div className="flex flex-col gap-[8px] mt-[12px]">
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
              <Link
                href="/find"
                className="text-sm text-gray--500 hover:text-black"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
          </form>

          <section>
            <h2 className="user-login-sns__title">
              &nbsp;SNS 계정으로 로그인&nbsp;
            </h2>
            <div className="flex mt-[24px] gap-[60px] items-center justify-center">
              <div className="relative">
                <Image
                  className="w-[60px] h-[60px] cursor-pointer"
                  src={naver}
                  alt="naver"
                />
                {loginType === 'naver' && (
                  <div className="user-last__login user-last__login--naver">
                    <div
                      className="absolute w-[50px] h-[50px] top-[0px] left-[30%] bg-white z-[-1]"
                      aria-hidden="true"
                    >
                      {/* 말풍선꼬리 */}
                    </div>
                    <strong>마지막</strong>으로
                    <br />
                    로그인한 방식
                  </div>
                )}
              </div>
              <div className="relative">
                <Image
                  className="w-[60px] h-[60px] cursor-pointer"
                  src={kakao}
                  alt="kakao"
                />
                {loginType === 'kakao' && (
                  <div className="user-last__login user-last__login--kakao">
                    <div
                      className="absolute w-[50px] h-[50px] top-[0px] left-[30%] bg-white z-[-1]"
                      aria-hidden="true"
                    >
                      {/* 말풍선꼬리 */}
                    </div>
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

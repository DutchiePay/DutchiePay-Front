'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'universal-cookie';
import Image from 'next/image';
import Link from 'next/link';
import SocialLogin from '@/app/_components/_user/SocialLogin';
import axios from 'axios';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';
import { login } from '@/redux/slice/loginSlice';
import logo from '../../../../public/image/logo.jpg';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [isVisible, setIsVisible] = useState(false);
  const [isRemeberMe, setIsRememberMe] = useState(false); // 자동로그인 체크 여부
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const isCertified = useSelector((state) => state.login.user.isCertified);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const password = watch('password');

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        formData
      );

      const userInfo = {
        userId: response.data.userId,
        nickname: response.data.nickname,
        profileImage: response.data.profileImg,
        location: response.data.location,
        isCertified: response.data.isCertified,
      };

      localStorage.setItem('loginType', response.data.loginType || 'email');
      dispatch(
        login({
          user: userInfo,
          access: response.data.access,
        })
      );

      const expires = isRemeberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : undefined;
      cookies.set('refresh', response.data.refresh, { path: '/', expires });
      router.push('/');
    } catch (error) {
      if (error.response.data.message === '해당하는 유저가 없습니다.')
        setIsUnauthorized(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <section className="w-full min-h-[890px] flex items-center justify-center">
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
                type="email"
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
                  onClick={() => setIsVisible((prev) => !prev)}
                />
              )}
            </div>

            <p
              className={`text-sm min-h-[20px] mt-[8px] text-red--500 text-start font-medium`}
            >
              {isSubmitted && (errors.email || errors.password)
                ? '이메일/비밀번호를 입력해주세요'
                : isUnauthorized
                  ? '일치하는 회원정보가 없습니다.'
                  : ''}
            </p>
            <div className="flex flex-col gap-[8px] mt-[12px]">
              <button type="submit" className="user__button-blue">
                로그인
              </button>
              <Link href="/signup" className="user__button-white" role="button">
                회원가입
              </Link>
            </div>

            <div className="flex justify-between items-center mt-[8px] mb-[32px]">
              <div className="flex items-center gap-[8px]">
                <input
                  id="remeberMe"
                  type="checkbox"
                  className="login__checkbox"
                  onChange={(e) => setIsRememberMe(e.target.checked)}
                />
                <label className="text-gray--500 text-sm" htmlFor="remeberMe">
                  자동 로그인
                </label>
              </div>
              <Link
                href="/find"
                className="text-sm text-gray--500 hover:text-black"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
          </form>

          <SocialLogin />
        </section>
      </div>
    </section>
  );
}

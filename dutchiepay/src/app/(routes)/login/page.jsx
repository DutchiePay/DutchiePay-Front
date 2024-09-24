'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import Cookies from 'universal-cookie';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';
import kakao from '../../../../public/image/kakao.png';
import { login } from '@/redux/slice/loginSlice';
import logo from '../../../../public/image/logo.jpg';
import naver from '../../../../public/image/naver.png';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [isVisible, setIsVisible] = useState(false);
  const [loginType, setLoginType] = useState(''); // email/kakao/naver
  const [isRemeberMe, setIsRememberMe] = useState(false); // 자동로그인 체크 여부

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitted },
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
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        formData
      );

      const userInfo = {
        isLoggedIn: true,
        loginType: response.data.type || 'email',
        user: {
          userId: response.data.userId,
          nickname: response.data.nickname,
          profileImage: response.data.profileImage,
          location: response.data.location,
          isCertified: response.data.isCertified,
        },
        access: response.data.access,
      };

      dispatch(
        login({
          loginType: userInfo.loginType,
          user: userInfo.user,
          access: userInfo.access,
        })
      );

      const expires = isRemeberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : undefined;
      cookies.set('refresh', response.data.refresh, { path: '/', expires });

      router.push('/');
    } catch {
      // 오류 발생
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
              <Link href="/signup" className="user__button-white" role="button">
                회원가입
              </Link>
            </div>

            <div className="flex justify-between items-center mt-[8px] mb-[32px]">
              <div className="flex items-center gap-[8px]">
                <input
                  type="checkbox"
                  className="login__checkbox"
                  onChange={(e) => setIsRememberMe(e.target.checked)}
                />
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
    </section>
  );
}

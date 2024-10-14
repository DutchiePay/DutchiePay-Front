'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Cookies from 'universal-cookie';
import Link from 'next/link';
import LoginInput from './LoginInput';
import axios from 'axios';
import { login } from '@/redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginSubmit() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const [isRemeberMe, setIsRememberMe] = useState(false); // 자동로그인 체크 여부
  const [isUnauthorized, setIsUnauthorized] = useState(false);

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
    <form onSubmit={handleSubmit(onSubmit)} onKeyUp={handleEnter}>
      <LoginInput
        register={register}
        watch={watch}
        errors={errors}
        isSubmitted={isSubmitted}
        isUnauthorized={isUnauthorized}
      />
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
        <Link href="/find" className="text-sm text-gray--500 hover:text-black">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </form>
  );
}

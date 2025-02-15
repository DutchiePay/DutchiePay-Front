'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import RememberMe from './RememberMe';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useLogin from '@/app/hooks/useLogin';
import { useState } from 'react';

export default function LoginSubmit() {
  const router = useRouter();
  const param = useSearchParams();
  const handleLogin = useLogin();
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
        hasMore: response.data.hasMore,
      };

      handleLogin({
        userInfo,
        access: response.data.access,
        loginType: 'email',
        isRelogin: false,
        isRemeberMe,
        refresh: response.data.refresh,
      });
      router.push(`${param ? decodeURIComponent(param.get('redirect')) : '/'}`);
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
      <LoginButton />
      <RememberMe setIsRememberMe={setIsRememberMe} />
    </form>
  );
}

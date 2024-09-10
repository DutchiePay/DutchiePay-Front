'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import FindSuccess from '@/app/_components/_user/FindSuccess';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

export default function Reset() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [isUser, setIsUser] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    criteriaMode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password', '');

  useEffect(() => {
    if (email) setIsUser(false);
  }, [email]);

  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/;

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[890px]">
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
      <section className="flex flex-col w-[500px]">
        <h2 className="text-2xl font-bold">비밀번호 재설정</h2>
        <p className="text-sm">
          비밀번호 재설정을 위해 새 비밀번호를 입력하고 '재설정' 버튼을
          눌러주세요.
        </p>
        <form
          className="flex flex-col gap-[8px] mt-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center">
              <label className="user__label">새 비밀번호</label>
              <span className="ml-[8px] text-[12px]">
                영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
              </span>
            </div>
            <input
              className="user__input-password"
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '8글자 이상 입력해주세요',
                },
                pattern: {
                  value: rPassword,
                  message: '올바른 비밀번호 형식을 입력해주세요',
                },
              })}
            />
            <p
              className={`text-sm font-medium min-h-[20px] ${errors.password ? 'text-red--500' : 'text-blue--500'}`}
              role="alert"
              aria-hidden={errors.password ? 'true' : 'false'}
            >
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label className="user__label">비밀번호 확인</label>
            <input
              className="user__input-password"
              type="password"
              placeholder="비밀번호 확인"
              {...register('confirmPassword', {
                validate: (value) => {
                  if (value !== password) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                  return true;
                },
              })}
            />
            <p
              className={`text-sm font-medium min-h-[20px] ${errors.confirmPassword ? 'text-red--500' : 'text-blue--500'}`}
              role="alert"
              aria-hidden={errors.confirmPassword ? 'true' : 'false'}
            >
              {!errors.password &&
                errors.confirmPassword &&
                errors.confirmPassword.message}
            </p>
          </div>

          <button
            className={`${isValid ? 'user__button-blue' : 'user__button-gray'} `}
            type="submit"
            disabled={!isValid}
          >
            비밀번호 재설정
          </button>
          <Link
            href="/"
            className="text-gray--500 text-sm text-center underline"
            role="button"
          >
            메인으로 돌아가기
          </Link>
        </form>
      </section>
    </section>
  );
}

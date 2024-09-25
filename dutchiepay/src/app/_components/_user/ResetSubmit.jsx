'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Link from 'next/link';
import PasswordInput from './PasswordInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function ResetSubmit() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, touchedFields },
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
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = (formData) => {
    // 로그인 유무에 따라 api 호출
    console.log(formData);
    // 로그인한 사용자의 경우 로그아웃 처리 후 main 이동
    router.push('/');
  };

  return (
    <form
      className="flex flex-col gap-[8px] mt-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
        touchedFields={touchedFields}
        password={password}
        confirmPassword={confirmPassword}
        isReset={true}
      />

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
  );
}

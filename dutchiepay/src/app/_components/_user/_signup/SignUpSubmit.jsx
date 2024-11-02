'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import EmailInput from '../_input/EmailInput';
import NicknameInput from '../_input/NicknameInput';
import PasswordInput from '../_input/PasswordInput';
import PhoneAuth from '../_phone/PhoneAuth';
import Policy from './Policy';
import RegionInput from '../_input/RegionInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpSubmit() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 가용성 상태

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData) => {
    const { confirmPassword, policy, authCode, ...userData } = formData;

    const payload = {
      ...userData,
      password: newPassword,
      location: address,
    };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        payload
      );
      router.push('/');
    } catch (error) {
      if (error.response.data.message === '이미 사용중인 전화번호입니다.') {
        alert('입력하신 전화번호로 가입하신 계정이 존재합니다.');
        setIsPhoneAuth(false);
        setIsCodeMatch(null);
        setValue('phone', ''); // 전화번호 입력 필드 초기화
        setValue('authCode', ''); // 인증번호 입력 필드 초기화
        clearErrors('phone');
      }
    }
  };

  const password = watch('password');
  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');
  const nickname = watch('nickname');
  const email = watch('email');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[4px] mt-[8px]"
    >
      <EmailInput
        register={register}
        errors={errors}
        email={email}
        touchedFields={touchedFields}
        setError={setError}
        clearErrors={clearErrors}
        isSignup={true}
        trigger={trigger}
        isEmailAvailable={isEmailAvailable}
        setIsEmailAvailable={setIsEmailAvailable}
      />
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
        password={password}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        touchedFields={touchedFields}
      />
      <NicknameInput
        register={register}
        errors={errors}
        nickname={nickname}
        trigger={trigger}
        touchedFields={touchedFields}
        setError={setError}
        clearErrors={clearErrors}
      />
      <RegionInput address={address} setAddress={setAddress} />
      <PhoneAuth
        register={register}
        watch={watch}
        errors={errors}
        touchedFields={touchedFields}
        isPhoneAuth={isPhoneAuth}
        setValue={setValue}
        setIsPhoneAuth={setIsPhoneAuth}
        isCodeMatch={isCodeMatch}
        setIsCodeMatch={setIsCodeMatch}
        isSignup={true}
        trigger={trigger}
      />

      <Policy register={register} />
      <button
        type="submit"
        className={`mt-[32px] px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          !isValid || isSubmitting || isCodeMatch === false || !isEmailAvailable
            ? 'bg-gray--200 cursor-not-allowed'
            : 'bg-blue--500'
        }`}
        disabled={
          !isValid || isSubmitting || isCodeMatch === false || !isEmailAvailable
        }
      >
        회원가입
      </button>
    </form>
  );
}

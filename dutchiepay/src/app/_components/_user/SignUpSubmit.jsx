'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import AddressInput from './AddressInput';
import EmailInput from './EmailInput';
import NicknameInput from './NicknameInput';
import PasswordInput from './PasswordInput';
import PhoneAuth from './PhoneAuth';
import Policy from './Policy';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function SignUpSubmit() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const {
    register,
    watch,
    handleSubmit,
    trigger,
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
      }
    }
  };

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
        setError={setError} // setError 함수 전달
        clearErrors={clearErrors} // clearErrors 함수 전달
        isSignup={true}
        trigger={trigger}
      />
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
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
        setError={setError} // setError 함수 전달
        clearErrors={clearErrors} // clearErrors 함수 전달
      />
      <AddressInput address={address} setAddress={setAddress} />
      <PhoneAuth
        register={register}
        watch={watch}
        errors={errors}
        touchedFields={touchedFields}
        isPhoneAuth={isPhoneAuth}
        setIsPhoneAuth={setIsPhoneAuth}
        setHasPhone={setHasPhone}
        isCodeMatch={isCodeMatch}
        setIsCodeMatch={setIsCodeMatch}
        isSignup={true}
      />

      <Policy register={register} />
      <button
        type="submit"
        className={`mt-[32px] px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          !isValid || isSubmitting || isCodeMatch === false
            ? 'bg-gray--200 cursor-not-allowed'
            : 'bg-blue--500'
        }`}
        disabled={!isValid || isSubmitting || isCodeMatch === false}
      >
        회원가입
      </button>
    </form>
  );
}

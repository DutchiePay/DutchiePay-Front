'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import AddressInput from './AddressInput';
import EmailInput from './EmailInput';
import NameInput from './NameInput';
import NicknameInput from './NicknameInput';
import PasswordInput from './PasswordInput';
import PhoneAuth from './PhoneAuth';
import Policy from './Policy';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpSubmit() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const onSubmit = async (formData) => {
    const {
      confirmPassword,
      policy,
      authCode,
      name = '',
      ...userData
    } = formData;
    console.log('authCode ===' + authCode);
    console.log('phoneCode ===' + phoneCode);

    if (phoneCode && authCode !== phoneCode) {
      console.log('인증번호 틀림');
      setIsAuthError(true);
      return; // 함수 종료하여 회원가입 진행 방지
    }

    const payload = {
      ...userData,
      location: address,
      name: userData.name || null, // userData.name이 빈 문자열일 경우 null 처리
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        payload
      );
      console.log('회원가입 성공:', response.data);
      router.push('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const password = watch('password');
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
        isSignup={true}
      />
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
        password={password}
        confirmPassword={confirmPassword}
        touchedFields={touchedFields}
      />
      <NicknameInput
        register={register}
        errors={errors}
        nickname={nickname}
        touchedFields={touchedFields}
      />
      <AddressInput address={address} setAddress={setAddress} />
      <NameInput register={register} />
      <PhoneAuth
        register={register}
        watch={watch}
        errors={errors}
        setPhoneCode={setPhoneCode}
        isAuthError={isAuthError}
        touchedFields={touchedFields}
        isPhoneAuth={isPhoneAuth}
        setIsPhoneAuth={setIsPhoneAuth}
        setHasPhone={setHasPhone}
        isSignup={true}
      />
      <span className="text-xs mt-[4px]">
        ※ 휴대폰 인증을 거치지 않을 경우, <strong>일부 서비스가 제한</strong>
        됩니다.
        <br /> 회원가입 이후에도 휴대폰 인증을 진행할 수 있습니다.
      </span>
      <Policy register={register} />
      <button
        type="submit"
        className={`mt-[32px] px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          !isValid || isSubmitting || hasPhone
            ? 'bg-gray--200 cursor-not-allowed'
            : 'bg-blue--500'
        }`}
        disabled={!isValid || isSubmitting || hasPhone}
      >
        회원가입
      </button>
    </form>
  );
}

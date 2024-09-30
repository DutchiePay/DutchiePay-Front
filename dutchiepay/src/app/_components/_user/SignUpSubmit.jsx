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
      location: address,
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
      <span className="text-xs mt-[4px]">
        ※ 휴대폰 인증을 거치지 않을 경우, <strong>일부 서비스가 제한</strong>
        됩니다.
        <br /> 회원가입 이후에도 휴대폰 인증을 진행할 수 있습니다.
      </span>
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

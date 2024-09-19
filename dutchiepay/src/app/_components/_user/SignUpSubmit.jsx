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
import { useState } from 'react';

export default function SignUpSubmit() {
  const [address, setAddress] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting },
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
      <EmailInput register={register} errors={errors} email={email} />
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
        password={password}
        confirmPassword={confirmPassword}
      />
      <NicknameInput register={register} errors={errors} nickname={nickname} />
      <NameInput register={register} />
      <PhoneAuth
        register={register}
        watch={watch}
        errors={errors}
        setPhoneCode={setPhoneCode}
        isAuthError={isAuthError}
      />
      <AddressInput address={address} setAddress={setAddress} />
      <Policy register={register} />
      <button
        type="submit"
        className={`px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          isValid ? 'bg-blue--500' : 'bg-gray--200 cursor-not-allowed'
        }`}
        disabled={!isValid || isSubmitting}
      >
        회원가입
      </button>
    </form>
  );
}

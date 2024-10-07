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
import { useSelector } from 'react-redux';

export default function AddInfoSubmit() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const accessToken = useSelector((state) => state.login.access);
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
    const { ...userData } = formData;

    const payload = {
      ...userData,
      location: address,
    };

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/location`,
        { location: payload.location },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (hasPhone) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/phone`,
          { phone: payload.phone },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      alert('저장되었습니다.');
    } catch (error) {
      console.error('추가정보 입력 실패:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[4px] mt-[8px]"
    >
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
      />
      <span className="text-xs mt-[4px]">
        ※ 휴대폰 인증을 거치지 않을 경우, <strong>일부 서비스가 제한</strong>
        됩니다.
      </span>

      <button
        type="submit"
        className={`mt-[32px] px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          !isValid || isSubmitting || isCodeMatch === false
            ? 'bg-gray--200 cursor-not-allowed'
            : 'bg-blue--500'
        }`}
        disabled={!isValid || isSubmitting || isCodeMatch === false}
      >
        저장하기
      </button>
    </form>
  );
}

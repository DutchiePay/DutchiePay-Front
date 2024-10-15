'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import AuthCode from './AuthCode';
import PhoneInput from './PhoneInput';
import { useState } from 'react';

export default function PhoneAuth({
  register,
  watch,
  errors,
  touchedFields,
  setValue,
  isPhoneAuth,
  setIsPhoneAuth,
  isCodeMatch,
  setIsCodeMatch,
  isSignup = false,
}) {
  const [phoneCode, setPhoneCode] = useState(null);
  const [remainingTime, setRemainingTime] = useState(180);
  const phone = watch('phone');
  const authCode = watch('authCode');

  return (
    <>
      <PhoneInput
        register={register}
        setValue={setValue}
        errors={errors}
        touchedFields={touchedFields}
        isSignup={isSignup}
        phone={phone}
        setIsPhoneAuth={setIsPhoneAuth}
        isPhoneAuth={isPhoneAuth}
        isCodeMatch={isCodeMatch}
        setIsCodeMatch={setIsCodeMatch}
        setRemainingTime={setRemainingTime}
        setPhoneCode={setPhoneCode}
      />
      {isPhoneAuth && (
        <AuthCode
          register={register}
          errors={errors}
          phoneCode={phoneCode}
          authCode={authCode}
          setIsCodeMatch={setIsCodeMatch}
          isCodeMatch={isCodeMatch}
          isPhoneAuth={isPhoneAuth}
          setIsPhoneAuth={setIsPhoneAuth}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
        />
      )}
    </>
  );
}

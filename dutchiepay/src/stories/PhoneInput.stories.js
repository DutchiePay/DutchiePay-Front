import PhoneAuth from '@/app/_components/_user/_phone/PhoneAuth';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'Input/PhoneAuth',
  component: PhoneAuth,
};

const Template = (args) => {
  const { register, setValue, watch } = useForm();
  return (
    <PhoneAuth
      {...args}
      register={register}
      setValue={setValue}
      watch={watch}
    />
  );
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  isSignup: false,
  touchedFields: {},
  errors: {},
  isPhoneAuth: false,
  setIsPhoneAuth: () => {},
  isCodeMatch: null,
  setIsCodeMatch: () => {},
};

// 인증번호 요청 상태
export const Requested = Template.bind({});
Requested.args = {
  isSignup: false,
  touchedFields: { phone: true },
  errors: {},
  phone: '01012345678',
  isPhoneAuth: true,
  setIsPhoneAuth: () => {},
  isCodeMatch: false,
  setIsCodeMatch: () => {},
  remainingTime: 180,
  phoneCode: '',
  authCode: '1234',
};

// 인증번호 일치
export const isPhoneVerified = Template.bind({});
isPhoneVerified.args = {
  isSignup: false,
  touchedFields: { phone: true },
  errors: {},
  phone: '01012345678',
  isPhoneAuth: false,
  setIsPhoneAuth: () => {},
  isCodeMatch: true,
  setIsCodeMatch: () => {},
  remainingTime: 0,
  phoneCode: '1234',
  authCode: '1234',
};

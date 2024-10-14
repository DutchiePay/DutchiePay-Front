import EmailInput from '@/app/_components/_user/EmailInput';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'Components/EmailInput',
  component: EmailInput,
};

const Template = (args) => {
  const { register, setError, clearErrors, trigger } = useForm();
  return (
    <EmailInput
      {...args}
      register={register}
      setError={setError}
      clearErrors={clearErrors}
      trigger={trigger}
    />
  );
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  isSignup: false,
  touchedFields: {},
  errors: {},
  email: '',
  isEmailAvailable: null,
  setIsEmailAvailable: () => {},
};

// 이메일 사용 가능 상태
export const EmailAvailable = Template.bind({});
EmailAvailable.args = {
  isSignup: true,
  touchedFields: { email: true },
  errors: {},
  email: 'example@example.com',
  isEmailAvailable: true,
  setIsEmailAvailable: () => {},
};

// 이메일 사용 불가능 상태 (이미 사용 중)
export const EmailInUse = Template.bind({});
EmailInUse.args = {
  isSignup: true,
  touchedFields: { email: true },
  errors: { email: { message: '이미 사용중인 이메일입니다' } },
  email: 'taken@example.com',
  isEmailAvailable: false,
  setIsEmailAvailable: () => {},
};

// 이메일 형식 오류 상태
export const InvalidEmailFormat = Template.bind({});
InvalidEmailFormat.args = {
  isSignup: true,
  touchedFields: { email: true },
  errors: { email: { message: '올바른 이메일 형식을 입력해주세요' } },
  email: 'invalid-email',
  isEmailAvailable: null,
  setIsEmailAvailable: () => {},
};

// 이메일이 입력되지 않은 상태
export const EmptyEmail = Template.bind({});
EmptyEmail.args = {
  isSignup: true,
  touchedFields: { email: true },
  errors: { email: { message: '이메일을 입력해주세요' } },
  email: '',
  isEmailAvailable: null,
  setIsEmailAvailable: () => {},
};

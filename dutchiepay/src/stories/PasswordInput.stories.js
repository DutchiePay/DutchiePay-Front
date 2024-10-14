import PasswordInput from '@/app/_components/_user/PasswordInput';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'Components/PasswordInput',
  component: PasswordInput,
};

const Template = (args) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useForm();
  return <PasswordInput {...args} register={register} />;
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  password: '',
  newPassword: '',
  confirmPassword: '',
  isReset: false,
  touchedFields: {},
  errors: {},
};

// 회원가입 비밀번호
export const SignupMode = Template.bind({});
SignupMode.args = {
  password: 'CurrentPassword123!',
  newPassword: 'NewPassword123!',
  confirmPassword: 'NewPassword123!',
  isReset: false,
  touchedFields: {},
  errors: {},
};

// 비밀번호 재설정
export const ResetMode = Template.bind({});
ResetMode.args = {
  password: '',
  newPassword: '',
  confirmPassword: '',
  isReset: true,
  touchedFields: {},
  errors: {},
};

// 두 비밀번호 유효성 통과 및 일치
export const PasswordValid = Template.bind({});
PasswordValid.args = {
  password: 'CurrentPassword123!',
  newPassword: 'NewPassword123!',
  confirmPassword: 'NewPassword123!',
  isReset: false,
  touchedFields: {
    password: true,
    newPassword: true,
    confirmPassword: true,
  },
  errors: {},
};

// 비밀번호 불일치
export const ConfirmPasswordMismatch = Template.bind({});
ConfirmPasswordMismatch.args = {
  password: 'CurrentPassword123!',
  newPassword: 'NewPassword123!',
  confirmPassword: 'DifferentPassword123!',
  isReset: false,
  touchedFields: {
    password: true,
    newPassword: true,
    confirmPassword: true,
  },
  errors: { confirmPassword: { message: '비밀번호가 일치하지 않습니다.' } },
};

// 비밀번호 형식 오류
export const PasswordError = Template.bind({});
PasswordError.args = {
  password: 'CurrentPassword123!',
  newPassword: 'short123', // 유효하지 않은 비밀번호
  confirmPassword: 'short123',
  isReset: false,
  touchedFields: {
    password: true,
    newPassword: true,
    confirmPassword: true,
  },
  errors: {
    newPassword: { message: '올바른 비밀번호 형식을 입력해주세요' },
    confirmPassword: { message: '' },
  },
};

// 비밀번호 길이 오류
export const PasswordLengthError = Template.bind({});
PasswordLengthError.args = {
  password: 'CurrentPassword123!',
  newPassword: 'short', // 유효하지 않은 비밀번호
  confirmPassword: 'short',
  isReset: false,
  touchedFields: {
    password: true,
    newPassword: true,
    confirmPassword: true,
  },
  errors: {
    newPassword: { message: '8글자 이상 입력해주세요' },
    confirmPassword: { message: '' },
  },
};

// 비밀번호 길이 오류
export const EmptyEmail = Template.bind({});
EmptyEmail.args = {
  password: '',
  newPassword: '',
  confirmPassword: '',
  isReset: false,
  touchedFields: {
    password: true,
    newPassword: true,
    confirmPassword: true,
  },
  errors: {
    newPassword: { message: '비밀번호를 입력해주세요' },
    confirmPassword: { message: '' },
  },
};

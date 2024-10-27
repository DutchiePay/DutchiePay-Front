import NicknameInput from '@/app/_components/_user/_input/NicknameInput';
import React from 'react';
import { useForm } from 'react-hook-form';

export default {
  title: 'Input/NicknameInput',
  component: NicknameInput,
};

const Template = (args) => {
  const { register, setError, clearErrors, trigger } = useForm();
  return (
    <NicknameInput
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
  touchedFields: {},
  errors: {},
  nickname: '',
};

// 닉네임 사용 가능 상태
export const NicknameAvailable = Template.bind({});
NicknameAvailable.args = {
  touchedFields: { nickname: true },
  errors: {},
  nickname: '닉네임예시',
};

// 닉네임 사용 불가능 상태 (이미 사용 중)
export const NicknameInUse = Template.bind({});
NicknameInUse.args = {
  touchedFields: { nickname: true },
  errors: { nickname: { message: '이미 사용중인 닉네임입니다.' } },
  nickname: '중복닉네임',
};

// 닉네임 형식 오류 상태
export const InvalidNicknameFormat = Template.bind({});
InvalidNicknameFormat.args = {
  touchedFields: { nickname: true },
  errors: { nickname: { message: '올바른 닉네임 형식을 입력해주세요' } },
  nickname: '길이안맞는닉네임',
};

// 닉네임이 입력되지 않은 상태
export const EmptyNickname = Template.bind({});
EmptyNickname.args = {
  touchedFields: { nickname: true },
  errors: { nickname: { message: '닉네임을 입력해주세요' } },
  nickname: '',
};

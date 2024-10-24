import LoginSubmit from '@/app/_components/_user/_login/LoginSubmit';
import { Provider } from 'react-redux';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/redux/slice/loginSlice';
import { useForm } from 'react-hook-form';

const mockLoggedInState = {
  isLoggedIn: false,
  user: {
    userId: null,
    nickname: null,
    profileImage: null,
    location: null,
    isCertified: null,
  },
  access: null,
};

const createTestStore = (initialState) => {
  return configureStore({
    reducer: {
      login: loginReducer,
    },
    preloadedState: { login: initialState },
  });
};

export default {
  title: 'Components/LoginSubmit',
  component: LoginSubmit,
  decorators: [
    (Story) => (
      <Provider store={createTestStore(mockLoggedInState)}>
        <Story />
      </Provider>
    ),
  ],
};

const Template = (args) => {
  const { register, watch, handleSubmit } = useForm();
  return (
    <LoginSubmit
      {...args}
      register={register}
      watch={watch}
      handleSubmit={handleSubmit}
    />
  );
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {
  errors: {},
  isSubmitted: false,
  isUnauthorized: false,
  setIsRememberMe: () => {},
};

// 일치하는 회원정보 없음
export const NotUser = Template.bind({});
NotUser.args = {
  errors: {},
  isUnauthorized: true,
  isSubmitted: true,
  setIsRememberMe: () => {},
};

// 이메일 입력 안 함
export const EmptyEmail = Template.bind({});
EmptyEmail.args = {
  errors: { email: { message: '이메일을 입력해주세요' } },
  isUnauthorized: false,
  isSubmitted: true,
  setIsRememberMe: () => {},
};

// 비밀번호 입력 안 함
export const EmptyPassword = Template.bind({});
EmptyPassword.args = {
  errors: { password: { message: '비밀번호를 입력해주세요' } },
  isUnauthorized: false,
  isSubmitted: true,
  setIsRememberMe: () => {},
};

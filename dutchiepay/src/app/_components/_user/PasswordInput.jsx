'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';

export default function PasswordInput({
  register,
  trigger,
  errors,
  touchedFields,
  password,
  confirmPassword,
  isReset = false,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // 비밀번호 확인 표시 여부

  useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/;

  return (
    <>
      <div>
        <div className="flex items-center">
          <label className="user__label" htmlFor="password">
            {isReset && '새'} 비밀번호
          </label>
          <span className="ml-[8px] text-[12px]">
            영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
          </span>
        </div>
        <div className="mb-[8px] flex relative">
          <input
            id="password"
            className={`user__input-password mt-[4px] ${
              touchedFields.password && errors.password
                ? 'user__input-password__invalid'
                : touchedFields.password && !errors.password && password
                  ? 'user__input-password__valid'
                  : ''
            }`}
            placeholder="비밀번호"
            type={isPasswordVisible ? 'text' : 'password'}
            aria-required="true"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요',
              },
              pattern: {
                value: rPassword,
                message: '올바른 비밀번호 형식을 입력해주세요',
              },
            })}
          />
          {password && (
            <Image
              className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
              src={isPasswordVisible ? eyeOpen : eyeClosed}
              alt="eyes"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            />
          )}
        </div>
        <p
          className={`text-sm font-medium min-h-[20px] ${errors.password ? 'text-red--500' : 'text-blue--500'}`}
          role="alert"
          aria-hidden={errors.password ? 'true' : 'false'}
        >
          {touchedFields.password && errors.password
            ? errors.password.message
            : touchedFields.password && !errors.password && password
              ? '사용가능한 비밀번호 입니다'
              : ''}
        </p>
      </div>
      <div>
        <div className="flex items-center">
          <label className="user__label" htmlFor="confirmPassword">
            비밀번호 확인
          </label>
          <span className="ml-[8px] text-[12px]">
            비밀번호를 한 번 더 입력해주세요
          </span>
        </div>
        <div className="mb-[8px] flex relative">
          <input
            id="confirmPassword"
            className={`user__input-password mt-[4px] ${
              touchedFields.confirmPassword && errors.confirmPassword
                ? 'user__input-password__invalid'
                : touchedFields.confirmPassword &&
                    !errors.confirmPassword &&
                    confirmPassword
                  ? 'user__input-password__valid'
                  : ''
            }`}
            placeholder="비밀번호 확인"
            aria-required="true"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {confirmPassword && (
            <Image
              className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
              src={isConfirmPasswordVisible ? eyeOpen : eyeClosed}
              alt="eyes"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
            />
          )}
        </div>
        <p
          className={`text-sm font-medium min-h-[20px] ${errors.confirmPassword ? 'text-red--500' : 'text-blue--500'}`}
          role="alert"
          aria-hidden={errors.confirmPassword ? 'true' : 'false'}
        >
          {touchedFields.confirmPassword && errors.confirmPassword
            ? errors.confirmPassword.message
            : touchedFields.confirmPassword &&
                !errors.confirmPassword &&
                confirmPassword
              ? '두 비밀번호가 일치합니다'
              : ''}
        </p>
      </div>
    </>
  );
}

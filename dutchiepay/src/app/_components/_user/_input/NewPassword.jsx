'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import eyeClosed from '/public/image/eyeClosed.svg';
import eyeOpen from '/public/image/eyeOpen.svg';
import { useState } from 'react';

export default function NewPassword({
  register,
  touchedFields,
  errors,
  newPassword,
  isReset,
}) {
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/;

  return (
    <div>
      <div className="flex items-center">
        <label className="user__label" htmlFor="newPassword">
          {isReset && '새'} 비밀번호
        </label>
        <span className="ml-[8px] text-[12px]">
          영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
        </span>
      </div>
      <div className="mb-[8px] flex relative">
        <input
          id="newPassword"
          className={`user__input-password mt-[4px] ${
            touchedFields.newPassword && errors.newPassword
              ? 'user__input-password__invalid'
              : touchedFields.newPassword && !errors.newPassword && newPassword
                ? 'user__input-password__valid'
                : ''
          }`}
          placeholder="비밀번호"
          type={isNewPasswordVisible ? 'text' : 'password'}
          aria-required="true"
          {...register('newPassword', {
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
        {newPassword && (
          <Image
            className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
            src={isNewPasswordVisible ? eyeOpen : eyeClosed}
            alt="eyes"
            onClick={() => setIsNewPasswordVisible((prev) => !prev)}
          />
        )}
      </div>
      <p
        className={`text-sm font-medium min-h-[20px] ${errors.newPassword ? 'text-red--500' : 'text-blue--500'}`}
        role="alert"
        aria-hidden={errors.newPassword ? 'true' : 'false'}
      >
        {touchedFields.newPassword && errors.newPassword
          ? errors.newPassword.message
          : touchedFields.newPassword && !errors.newPassword && newPassword
            ? '사용가능한 비밀번호 입니다'
            : ''}
      </p>
    </div>
  );
}

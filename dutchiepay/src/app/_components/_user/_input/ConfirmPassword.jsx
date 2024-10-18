'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import eyeClosed from '/public/image/eyeClosed.svg';
import eyeOpen from '/public/image/eyeOpen.svg';
import { useState } from 'react';

export default function ConfirmPassword({
  register,
  touchedFields,
  errors,
  newPassword,
  confirmPassword,
}) {
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <>
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
            touchedFields.confirmPassword &&
            errors.confirmPassword &&
            !errors.newPassword
              ? 'user__input-password__invalid'
              : touchedFields.confirmPassword &&
                  !errors.confirmPassword &&
                  confirmPassword &&
                  !errors.newPassword
                ? 'user__input-password__valid'
                : ''
          }`}
          placeholder="비밀번호 확인"
          aria-required="true"
          type={isConfirmPasswordVisible ? 'text' : 'password'}
          {...register('confirmPassword', {
            validate: (value) => {
              if (newPassword && !errors.newPassword) {
                return value === newPassword || '비밀번호가 일치하지 않습니다.';
              }
              return false; // newPassword가 유효하지 않으면 항상 false 반환
            },
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
        {touchedFields.confirmPassword &&
        errors.confirmPassword &&
        !errors.newPassword
          ? errors.confirmPassword.message
          : touchedFields.confirmPassword &&
              !errors.confirmPassword &&
              confirmPassword &&
              !errors.newPassword
            ? '두 비밀번호가 일치합니다'
            : ''}
      </p>
    </>
  );
}

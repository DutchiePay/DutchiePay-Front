'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import eyeClosed from '/public/image/eyeClosed.svg';
import eyeOpen from '/public/image/eyeOpen.svg';
import { useState } from 'react';

export default function CurrentPassword({
  register,
  touchedFields,
  errors,
  password,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/;

  return (
    <>
      <div className="flex items-center">
        <label className="user__label" htmlFor="password">
          현재 비밀번호
        </label>
        <span className="ml-[8px] text-[12px]">
          현재 사용중인 비밀번호를 입력해주세요
        </span>
      </div>
      <div className="flex relative">
        <input
          id="password"
          className={`user__input-password mt-[4px] ${
            touchedFields.password && errors.password
              ? 'user__input-password__invalid'
              : ''
          }`}
          placeholder="현재 비밀번호"
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
          : ''}
      </p>
    </>
  );
}

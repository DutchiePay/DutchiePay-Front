'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import axios from 'axios';
import { useState } from 'react';

export default function EmailInput({
  register,
  errors,
  email,
  touchedFields,
  setError,
  trigger,
  clearErrors,
  isSignup = false,
  isFind = false,
}) {

  const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 가용성 상태 추가

  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const checkEmailAvailability = async (e) => {
    const value = e.target.value;

    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        params: {
          email: value,
        },
      });
      setIsEmailAvailable(true); // 이메일 사용 가능
      clearErrors('email');
    } catch (error) {
      console.log(error.response);

      if (error.response.data.message === '이미 사용중인 이메일입니다.') {
        setError('email', {
          type: 'manual',
          message: '이미 사용중인 이메일입니다',
        });
        setIsEmailAvailable(false);
      } else if (error.response.data.message === '탈퇴한 회원입니다.') {
        setError('email', {
          type: 'manual',
          message: '탈퇴된 이메일입니다',
        });
        setIsEmailAvailable(false);
      } else if (error.response.data.message === '정지된 회원입니다.') {
        setError('email', {
          type: 'manual',
          message: '정지된 이메일입니다',
        });
        setIsEmailAvailable(false);
      } else {
        console.error('이메일 체크 중 오류 발생:', error);
        setIsEmailAvailable(null); // 오류 발생 시 초기화
      }
    }
  };

  return (
    <div>
      <label className="user__label">이메일</label>
      <input
        className={`user__input mt-[4px] ${
          touchedFields.email && errors.email
            ? 'user__input__invalid'
            : touchedFields.email && !errors.email && email
              ? isSignup
                ? 'user__input__valid'
                : ''
              : ''
        }`}
        type="email"
        placeholder="이메일"
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: rEmail,
            message: '올바른 이메일 형식을 입력해주세요',
          },
          onBlur: async (e) => {
            if (isSignup) {
              // isSignup이 true일 때만 체크
              const isValid = await trigger('email'); // 패턴 검사를 수행
              if (isValid) {
                checkEmailAvailability(e); // API 호출
              } else {
                setIsEmailAvailable(null); // 패턴이 유효하지 않을 경우 가용성 초기화
              }
            }
          },
        })}
      />
      <p
        className={`text-sm min-h-[20px] mt-[8px] font-medium ${
          errors.email ? 'text-red--500' : 'text-blue--500'
        }`}
        role="alert"
        aria-hidden={errors.email ? 'true' : 'false'}
      >
        {isSignup
          ? touchedFields.email && errors.email
            ? errors.email.message
            : touchedFields.email && !errors.email && email && isEmailAvailable
              ? '사용가능한 이메일 입니다'
              : touchedFields.email && !errors.email && email
                ? '올바른 이메일 형식입니다.'
                : ''
          : errors.email
            ? errors.email.message
            : touchedFields.email && !errors.email && email
              ? '올바른 이메일 형식입니다.'
              : ''}
      </p>
    </div>
  );
}

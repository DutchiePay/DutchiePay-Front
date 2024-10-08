'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import axios from 'axios';

export default function EmailInput({
  register,
  errors,
  email,
  touchedFields,
  setError,
  clearErrors,
  isSignup = false,
  isFind = false,
}) {
  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const checkEmailAvailability = async (e) => {
    const value = e.target.value;
    if (rEmail.test(value)) {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
          params: {
            email: value,
          },
        });
      } catch (error) {
        // 400 오류가 발생하면 email에 대한 오류를 설정
        if (error.response && error.response.status === 400) {
          setError('email', {
            type: 'manual',
            message: '사용중인 이메일입니다',
          });
        } else {
          console.error('이메일 체크 중 오류 발생:', error);
        }
      }
    } else {
      clearErrors('email'); // 닉네임 형식이 유효하지 않을 경우 초기화
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
          onBlur: !isFind ? checkEmailAvailability : undefined,
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
            : touchedFields.email && !errors.email && email
              ? '사용가능한 이메일 입니다'
              : ''
          : errors.email
            ? errors.email.message
            : ''}
      </p>
    </div>
  );
}

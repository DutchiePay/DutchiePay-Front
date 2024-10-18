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
  trigger,
  clearErrors,
  isSignup = false,
  isEmailAvailable,
  setIsEmailAvailable = () => {},
}) {
  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const checkEmailAvailability = async (e) => {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users?email=${e.target.value}`
      );
      setIsEmailAvailable(true);
      clearErrors('email');
    } catch (error) {
      if (error.response.data.message === '이미 사용중인 이메일입니다.') {
        setError('email', {
          type: 'manual',
          message: '이미 사용중인 이메일입니다.',
        });
      } else if (
        error.response.data.message === '탈퇴한 회원입니다.' ||
        error.response.data.message === '정지된 회원입니다.'
      ) {
        setError('email', {
          type: 'manual',
          message: '탈퇴 또는 정지된 이메일입니다.',
        });
      }
      setIsEmailAvailable(false);
    }
  };

  return (
    <div>
      <label className="user__label">이메일</label>
      <input
        className={`user__input mt-[4px] ${
          touchedFields.email && errors.email
            ? 'user__input__invalid'
            : touchedFields.email && !errors.email && email && isEmailAvailable
              ? 'user__input__valid'
              : touchedFields.email && !errors.email && email && !isSignup
                ? 'user__input__valid'
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
              // isTrigger가 true일 때만 체크
              const isTrigger = await trigger('email'); // 패턴 검사를 수행
              if (isTrigger) {
                checkEmailAvailability(e); // API 호출
              } else {
                setIsEmailAvailable(null); // 패턴이 유효하지 않을 경우 가용성 초기화
              }
            }
          },
          onChange: (e) => {
            if (isEmailAvailable && e.target.value !== email) {
              setIsEmailAvailable(null);
              clearErrors('email');
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
        {touchedFields.email && errors.email
          ? errors.email.message
          : touchedFields.email && !errors.email && email && isEmailAvailable
            ? '사용가능한 이메일 입니다.'
            : touchedFields.email && !errors.email && email && !isSignup
              ? '올바른 이메일 형식입니다.'
              : ''}
      </p>
    </div>
  );
}

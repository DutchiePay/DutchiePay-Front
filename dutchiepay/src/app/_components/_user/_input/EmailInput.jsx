'use client';

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
      <label className="text-lg font-bold">이메일</label>
      <input
        className={`w-full border border-gray--200 py-[12px] px-[16px] rounded outline-none placeholder:text-sm mt-[4px] ${
          touchedFields.email && errors.email
            ? 'border border-red--500'
            : touchedFields.email && !errors.email && email && isEmailAvailable
              ? 'border border-blue--500'
              : touchedFields.email && !errors.email && email && !isSignup
                ? 'border border-blue--500'
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
              const isTrigger = await trigger('email');
              if (isTrigger) {
                checkEmailAvailability(e);
              } else {
                setIsEmailAvailable(null);
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
        aria-hidden={!touchedFields.email || !errors.email ? 'true' : 'false'}
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

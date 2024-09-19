'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

export default function EmailInput({ register, errors, email }) {
  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return (
    <div>
      <label className="user__label">이메일</label>
      <input
        className={`user__input mt-[4px] ${
          errors.email
            ? 'user__input__invalid'
            : rEmail.test(email) && 'user__input__valid'
        }`}
        type="text"
        placeholder="이메일"
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern: {
            value: rEmail,
            message: '올바른 이메일 형식을 입력해주세요',
          },
        })}
      />
      <p
        className={`text-sm min-h-[20px] mt-[8px] ${
          errors.email
            ? 'text-red--500'
            : rEmail.test(email) && 'text-blue--500'
        }`}
        role="alert"
        aria-hidden={errors.email ? 'true' : 'false'}
      >
        {errors.email
          ? errors.email.message
          : rEmail.test(email) && '사용가능한 이메일 입니다.'}
      </p>
    </div>
  );
}

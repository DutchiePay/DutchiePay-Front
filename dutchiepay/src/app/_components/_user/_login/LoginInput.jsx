import Image from 'next/image';
import eyeClosed from '/public/image/eyeClosed.svg';
import eyeOpen from '/public/image/eyeOpen.svg';
import { useState } from 'react';

export default function LoginInput({
  register,
  watch,
  errors,
  isSubmitted,
  isUnauthorized,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const password = watch('password');

  return (
    <>
      <div className="mb-[8px]">
        <input
          className="w-full border border-gray--200 py-[12px] px-[16px] rounded outline-none mt-[4px] placeholder:text-sm"
          placeholder="이메일"
          type="email"
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
        />
      </div>

      <div className="flex relative">
        <input
          className="w-full border border-gray--200 py-[12px] px-[16px] rounded outline-none mt-[4px] placeholder:text-sm"
          placeholder="비밀번호"
          type={isVisible ? 'text' : 'password'}
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        {password && (
          <Image
            className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
            src={isVisible ? eyeOpen : eyeClosed}
            alt="eyes"
            onClick={() => setIsVisible((prev) => !prev)}
          />
        )}
      </div>

      <p
        className={`text-sm min-h-[20px] mt-[8px] text-red--500 text-start font-medium`}
      >
        {isSubmitted && (errors.email || errors.password)
          ? '이메일/비밀번호를 입력해주세요'
          : isUnauthorized
            ? '일치하는 회원정보가 없습니다.'
            : ''}
      </p>
    </>
  );
}

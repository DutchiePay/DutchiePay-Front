'use client';

import axios from 'axios';
import { useState } from 'react';

export default function NicknameInput({
  register,
  errors,
  nickname,
  touchedFields,
  trigger,
  setError,
  clearErrors,
}) {
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null); // 닉네임 가용성 상태
  const rNickname = /^[a-zA-Z0-9가-힣]{2,8}$/;

  const checkNicknameAvailability = async (e) => {
    const value = e.target.value;

    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users?nickname=${value}`
      );
      setIsNicknameAvailable(true);
      clearErrors('nickname');
    } catch (error) {
      if (error.response.data.message === '이미 사용중인 닉네임입니다.') {
        setError('nickname', {
          type: 'manual',
          message: '이미 사용중인 닉네임입니다.',
        });
        setIsNicknameAvailable(false);
      } else {
        setIsNicknameAvailable(null); // 오류 발생 시 초기화
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <label className="text-lg font-bold">닉네임</label>
        <span className="ml-[8px] text-xs">
          한글, 영문, 숫자만을 포함하여 2글자 이상 8글자 이하
        </span>
      </div>
      <div className="flex relative">
        <input
          className={`w-full border border-gray--200 py-[12px] px-[16px] rounded outline-none mt-[4px] placeholder:text-sm ${
            touchedFields.nickname && errors.nickname
              ? 'border border-red--500'
              : touchedFields.nickname &&
                  !errors.nickname &&
                  nickname &&
                  isNicknameAvailable
                ? 'border border-blue--500'
                : ''
          }`}
          placeholder="닉네임"
          type="text"
          maxLength={8}
          aria-required="true"
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: rNickname,
              message: '올바른 닉네임 형식을 입력해주세요',
            },
            onBlur: async (e) => {
              const isTrigger = await trigger('nickname');
              if (isTrigger) {
                checkNicknameAvailability(e);
              } else {
                setIsNicknameAvailable(null);
              }
            },
            onChange: (e) => {
              if (isNicknameAvailable && e.target.value !== nickname) {
                setIsNicknameAvailable(null);
                clearErrors('nickname');
              }
            },
          })}
        />
      </div>
      <p
        className={`text-sm min-h-[20px] font-medium ${
          nickname && !errors.nickname ? 'text-blue--500' : 'text-red--500'
        }`}
        role="alert"
        aria-hidden={
          !touchedFields.nickname || !errors.nickname ? 'true' : 'false'
        }
      >
        {touchedFields.nickname && errors.nickname
          ? errors.nickname.message
          : touchedFields.nickname &&
              !errors.nickname &&
              nickname &&
              isNicknameAvailable
            ? '사용가능한 닉네임 입니다'
            : ''}
      </p>
    </>
  );
}

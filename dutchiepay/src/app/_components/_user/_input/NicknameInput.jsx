'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

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
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null); // 이메일 가용성 상태 추가
  const rNickname = /^[a-zA-Z0-9가-힣]{2,8}$/;

  const checkNicknameAvailability = async (e) => {
    const value = e.target.value;

    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users?nickname=${value}`
      );
      setIsNicknameAvailable(true);
      clearErrors('nickname'); // 사용 가능한 닉네임이므로 오류를 클리어
    } catch (error) {
      console.log(error.response.data);

      // 400 오류가 발생하면 nickname에 대한 오류를 설정
      if (error.response.data.message === '이미 사용중인 닉네임입니다.') {
        setError('nickname', {
          type: 'manual',
          message: '이미 사용중인 닉네임입니다.',
        });
        setIsNicknameAvailable(false);
      } else {
        console.error('닉네임 체크 중 오류 발생:', error);
        setIsNicknameAvailable(null); // 오류 발생 시 초기화
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <label className="user__label">닉네임</label>
        <span className="ml-[8px] text-[12px]">
          한글, 영문, 숫자만을 포함하여 2글자 이상 8글자 이하
        </span>
      </div>
      <div className="flex relative">
        <input
          className={`user__input mt-[4px] ${
            touchedFields.nickname && errors.nickname
              ? 'user__input__invalid'
              : touchedFields.nickname && !errors.nickname && nickname
                ? 'user__input__valid'
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
              // isTrigger가 true일 때만 체크
              const isTrigger = await trigger('nickname'); // 패턴 검사를 수행
              if (isTrigger) {
                checkNicknameAvailability(e); // API 호출
              } else {
                setIsNicknameAvailable(null); // 패턴이 유효하지 않을 경우 가용성 초기화
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
        aria-hidden={errors.nickname ? 'true' : 'false'}
      >
        {touchedFields.nickname && errors.nickname
          ? errors.nickname.message
          : touchedFields.nickname &&
              !errors.nickname &&
              nickname &&
              isNicknameAvailable
            ? '사용가능한 닉네임 입니다'
            : touchedFields.nickname && !errors.nickname && nickname
              ? '올바른 닉네임 형식입니다.'
              : ''}
      </p>
    </>
  );
}

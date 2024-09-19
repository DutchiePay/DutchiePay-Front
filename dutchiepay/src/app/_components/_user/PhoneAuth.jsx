import { useEffect, useState } from 'react';

import axios from 'axios';

export default function PhoneAuth({
  register,
  watch,
  errors,
  setPhoneCode,
  isAuthError,
  touchedFields,
}) {
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [remainingTime, setRemainingTime] = useState(180);
  const phone = watch('phone');
  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  useEffect(() => {
    let timer;
    if (isPhoneAuth) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPhoneAuth]);

  const handleAuthClick = async () => {
    if (rPhone.test(phone)) {
      try {
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`,
        //   {
        //     phone,
        //   }
        // );
        // console.log(response.data);
        // onAuthSuccess(response.data.code);
        setRemainingTime(180);
        setIsPhoneAuth(true);
        setPhoneCode('1234');
      } catch (error) {
        console.error('인증번호 전송 실패:', error);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = String(seconds % 60).padStart(2, '0'); // 초 부분만 2자리로 맞춤
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div>
      <div className="flex items-center">
        <label className="user__label">휴대폰 번호 (선택)</label>
        <span className="ml-[8px] text-[12px]">
          -을 제외한 전화번호를 입력해주세요
        </span>
      </div>
      <div className="mt-[4px] mb-[8px] flex relative">
        <input
          disabled={isPhoneAuth}
          className={`user__input mt-[4px] ${
            touchedFields.phone && errors.phone
              ? 'user__input__invalid'
              : touchedFields.phone && !errors.phone && phone
                ? 'user__input__valid'
                : ''
          }`}
          placeholder="휴대폰 번호 (ex : 01012345678)"
          type="text"
          maxLength={11}
          {...register('phone', {
            pattern: {
              value: rPhone,
              message: '올바른 휴대폰 번호 형식을 입력해주세요',
            },
          })}
        />
        <button
          type="button"
          className={`w-[90px] h-[50px] mt-[4px] absolute right-0 top-0  px-[20px] text-[14px] font-bold text-white rounded-r-[4px] 
                  ${
                    touchedFields.phone && errors.phone
                      ? 'bg-gray--200 cursor-not-allowed border border-red--500 border-l-0'
                      : touchedFields.phone && !errors.phone && phone
                        ? 'bg-blue--500 cursor-pointer border border-blue--500 border-l-0'
                        : 'border-none bg-gray--200 cursor-not-allowed'
                  }`}
          onClick={handleAuthClick}
        >
          {isPhoneAuth ? '재전송' : '인증하기'}
        </button>
      </div>

      {isPhoneAuth && (
        <div className="mt-[8px] flex w-[500px] text-[14px]">
          <input
            className="w-[150px] border border-[#d1d2d7] px-[16px] py-[12px] mr-[10px] rounded-[4px] outline-none"
            placeholder="인증번호 입력"
            type="text"
            {...register('authCode', {
              required: '인증번호를 입력해주세요',
            })}
          />
          <div className="w-[300px]">
            <p className="font-medium text-red-500">
              {formatTime(remainingTime)}
            </p>
            <p
              className={`text-sm min-h-[20px] mt-[8px] ${isAuthError ? 'text-red--500' : 'text-blue--500'}`}
              role="alert"
              aria-hidden={isAuthError ? 'true' : 'false'}
            >
              {isAuthError && '인증번호가 일치하지 않습니다.'}
            </p>
          </div>
        </div>
      )}
      <span className="text-xs mt-[4px]">
        ※ 휴대폰 인증을 거치지 않을 경우, <strong>일부 서비스가 제한</strong>
        됩니다.
        <br /> 회원가입 이후에도 휴대폰 인증을 진행할 수 있습니다.
      </span>
    </div>
  );
}

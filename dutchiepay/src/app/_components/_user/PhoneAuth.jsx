import { useEffect, useState } from 'react';
import axios from 'axios';
export default function PhoneAuth({
  register,
  watch,
  errors,
  touchedFields,
  onAuthSuccess,
  isAuthError,
}) {
  const [isAuthInputVisible, setIsAuthInputVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(180);
  const phone = watch('phone');
  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  useEffect(() => {
    let timer;
    if (isAuthInputVisible) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsAuthInputVisible(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAuthInputVisible]);
  useEffect(() => {
    if (isAuthInputVisible) {
      // 테스트용 현재 인증번호 코드 1234로 고정
      onAuthSuccess('1234');
    }
  }, [isAuthInputVisible]);

  // 테스트용 코드
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
        setIsAuthInputVisible(true);
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
      <div className="mb-[8px] flex relative">
        <input
          disabled={rPhone.test(phone)}
          className={`user__input ${
            phone.length === 0
              ? ''
              : !rPhone.test(phone)
                ? 'user__input__invalid'
                : 'user__input__valid'
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
          className={`absolute right-0 top-0 h-full px-[20px] text-[14px] font-bold text-white rounded-r-[4px] 
                  ${
                    phone.length === 0
                      ? 'border-none bg-gray--200 cursor-not-allowed '
                      : !rPhone.test(phone)
                        ? 'bg-gray--200 cursor-not-allowed border border-red--500 border-l-0'
                        : 'bg-blue--500 cursor-pointer border border-blue--500 border-l-0'
                  }`}
          onClick={handleAuthClick}
          disabled={!rPhone.test(phone) || errors.phone}
        >
          인증하기
        </button>
      </div>

      {isAuthInputVisible && (
        <div className="mt-[8px] flex w-[500px] text-[14px]">
          <input
            className={`w-[200px] border border-[#d1d2d7] px-[16px] py-[12px] mr-[10px] rounded-[4px] outline-none ${
              errors.authCode
                ? 'user__input__invalid'
                : !errors.authCode && touchedFields.authCode
                  ? 'user__input__valid'
                  : ''
            }`}
            placeholder="인증번호 입력"
            type="text"
            {...register('authCode', {
              required: '인증번호를 입력해주세요',
            })}
          />
          <div className="w-[300px]">
            <p className="font-semibold">{formatTime(remainingTime)}</p>
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
      <span className="text-xs">
        ※ 휴대폰 인증을 거치지 않을 경우, <strong>일부 서비스가 제한</strong>
        됩니다.
        <br /> 회원가입 이후에도 휴대폰 인증을 진행할 수 있습니다.
      </span>
    </div>
  );
}

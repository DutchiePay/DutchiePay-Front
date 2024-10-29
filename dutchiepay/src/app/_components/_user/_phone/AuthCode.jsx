import '@/styles/globals.css';
import '@/styles/user.css';

import AuthTime from './AuthTime';
import { useEffect } from 'react';

export default function AuthCode({
  register,
  errors,
  phoneCode,
  authCode,
  setIsCodeMatch,
  isCodeMatch,
  isPhoneAuth,
  setIsPhoneAuth,
  remainingTime,
  setRemainingTime,
}) {
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
  }, [isPhoneAuth, setRemainingTime]);

  const handleAuthCheck = () => {
    if (authCode !== phoneCode) {
      alert('인증번호가 일치하지 않습니다.');
      setIsCodeMatch(false);
      return;
    }

    alert('인증번호가 확인되었습니다.');
    setIsCodeMatch(true);
    setIsPhoneAuth(false);
  };

  return (
    <div className="mt-[8px] flex">
      <div className="relative w-full">
        <input
          className={`w-full user__input mt-[4px] ${isCodeMatch === true ? 'user__input__valid' : ''}`}
          placeholder="인증번호"
          type="number"
          {...register('authCode', {
            required: '인증번호를 입력해주세요',
          })}
          disabled={isCodeMatch}
        />
        <AuthTime remainingTime={remainingTime} />
        <button
          type="button"
          className={`w-[90px] h-[50px] mt-[4px] absolute right-0 top-0 px-[20px] text-sm font-bold text-white rounded-r-[4px]
            ${
              !errors.authCode && authCode
                ? 'bg-blue--500 cursor-pointer border border-blue--500 border-l-0'
                : isCodeMatch === false && authCode
                  ? 'bg-gray--200 cursor-not-allowed border border-red--500 border-l-0'
                  : 'border-none bg-gray--200 cursor-not-allowed'
            }`}
          onClick={handleAuthCheck}
          disabled={!authCode || errors.authCode}
        >
          인증번호
          <br />
          확인
        </button>
      </div>
    </div>
  );
}

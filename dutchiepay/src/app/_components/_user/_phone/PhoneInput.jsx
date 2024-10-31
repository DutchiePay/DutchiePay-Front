import '@/styles/globals.css';
import '@/styles/user.css';

import axios from 'axios';
import { useEffect } from 'react';

export default function PhoneInput({
  register,
  setValue,
  errors,
  touchedFields,
  isSignup,
  phone,
  setIsPhoneAuth,
  isPhoneAuth,
  isCodeMatch,
  setIsCodeMatch,
  setRemainingTime,
  setPhoneCode,
  trigger,
}) {
  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  useEffect(() => {
    if (phone) {
      setIsCodeMatch(false);
      trigger('phone'); // 핸드폰 번호가 변경될 때 유효성 검사를 트리거
    } else {
      setIsCodeMatch(null);
    }
  }, [phone, setIsCodeMatch, trigger]);
  const handleAuthClick = async () => {
    if (!errors.phone && phone) {
      setIsPhoneAuth(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/auth`,
          {
            phone: phone,
          }
        );
        setRemainingTime(180);
        setPhoneCode(response.data.code);
      } catch (error) {
        alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <label className="user__label">휴대폰 번호</label>
        <span className="ml-[8px] text-[12px]">
          -을 제외한 전화번호를 입력해주세요
        </span>
      </div>
      <div className="mt-[4px] mb-[8px] flex relative">
        <input
          type="text"
          className={`user__input mt-[4px] ${
            touchedFields.phone && errors.phone
              ? 'user__input__invalid'
              : touchedFields.phone && !errors.phone && phone
                ? isSignup
                  ? 'user__input__valid'
                  : ''
                : ''
          }`}
          placeholder="휴대폰 번호 (ex : 01012345678)"
          maxLength={11}
          {...register('phone', {
            onChange: (e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, '');
              setValue('phone', newValue);
              trigger('phone'); // 유효성 검사 트리거
            },
            pattern: {
              value: rPhone,
              message: '올바른 휴대폰 번호 형식을 입력해주세요',
            },
            required: '휴대폰 번호를 입력해주세요.',
          })}
          disabled={isPhoneAuth || isCodeMatch}
        />
        <button
          type="button"
          className={`w-[90px] h-[50px] mt-[4px] absolute right-0 top-0  px-[20px] text-sm font-bold text-white rounded-r-[4px] 
                  ${
                    errors.phone
                      ? 'bg-gray--200 cursor-not-allowed border border-red--500 border-l-0'
                      : !errors.phone && phone
                        ? 'bg-blue--500 border border-blue--500 border-l-0'
                        : 'border-none bg-gray--200 cursor-not-allowed'
                  } ${isCodeMatch === true ? 'cursor-not-allowed' : ''}`}
          onClick={handleAuthClick}
          disabled={!phone || errors.phone || isCodeMatch === true}
        >
          {isPhoneAuth
            ? '재전송'
            : isCodeMatch === true
              ? '인증완료'
              : '인증하기'}
        </button>
      </div>
    </>
  );
}

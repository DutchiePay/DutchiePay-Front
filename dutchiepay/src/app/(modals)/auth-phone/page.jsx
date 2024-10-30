'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import PhoneAuth from '@/app/_components/_user/_phone/PhoneAuth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function AuthPhone() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);

  const loginType = localStorage.getItem('loginType');
  const {
    register,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
  });

  useEffect(() => {
    if (!isLoggedIn || !access) {
      alert('비정상적인 접속');
      closeWindow();
    }
  }, [access, isLoggedIn]);

  const handleWithdraw = async () => {
    if (confirm('정말 탈퇴하실겁니까?')) {
      try {
        if (loginType === 'email') {
          await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
        } else {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/oauth?type=${loginType}`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );
        }
        // 부모 창에 로그아웃 메시지 전송
        window.opener.postMessage({ type: 'LOGOUT' }, window.location.origin);
        alert('정상적으로 탈퇴처리 되었습니다.');
      } catch (error) {
        // 에러 처리
        alert('탈퇴 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <section className="min-w-[620px] p-[32px]">
      <h1 className="text-3xl font-bold mb-4">회원탈퇴</h1>
      <p className="text-xs text-gray--500 mb-6">
        회원탈퇴를 위해서는 휴대폰 본인 인증을 필요로 합니다.
        <br />
        휴대폰 번호를 입력 후, 인증하기를 눌러주세요.
      </p>

      <PhoneAuth
        register={register}
        watch={watch}
        errors={errors}
        touchedFields={touchedFields}
        setValue={setValue}
        isPhoneAuth={isPhoneAuth}
        setIsPhoneAuth={setIsPhoneAuth}
        isCodeMatch={isCodeMatch}
        setIsCodeMatch={setIsCodeMatch}
      />
      {isCodeMatch && (
        <p className="text-sm mt-4">
          휴대폰 번호 인증이 완료되었습니다.
          <br />
          <strong>확인</strong> 버튼을 누르시면 정상적으로 탈퇴가 진행됩니다.
        </p>
      )}
      <div className="mt-[40px] flex gap-[12px] justify-center">
        <button
          className={`text-red-500 text-sm rounded-lg px-[24px] py-[8px] ${!isCodeMatch ? 'cursor-not-allowed bg-gray--100 text-white' : 'bg-red--100'}`}
          onClick={handleWithdraw}
          disabled={!isCodeMatch}
        >
          탈퇴하기
        </button>
        <button
          className="text-blue--500 text-sm border border-blue--200 rounded-lg px-[24px] py-[8px]"
          type="button"
          onClick={closeWindow}
        >
          취소
        </button>
      </div>
    </section>
  );
}

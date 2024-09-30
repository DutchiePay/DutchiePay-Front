'use client';

import '@/styles/user.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import PhoneAuth from '@/app/_components/_user/PhoneAuth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setPhone } from '@/redux/slice/userSlice';

export default function ChangeNumber() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const phone = useSelector((state) => state.user.user.phone);
  console.log(phone);
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
  });

  /*useEffect(() => {
    if (!isLoggedIn || !access) {
      alert('비정상적인 접속');
      closeWindow();
    }
  }, []);*/ // 개발을 위해 비회원일 때도 페이지 접근 가능하도록 임시 비활성화

  const onSubmit = async (formData) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/phone`,
        { phone: formData.phone },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      dispatch(setPhone({ phone: formData.phone }));
      console.log(response);
      window.close();
      // 핸드폰 번호를 formData.phone으로 바꾸는 로직 추가
    } catch (error) {
      // 에러 처리
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <section className="min-w-[620px] p-[32px]">
      <h1 className="text-3xl font-bold">휴대폰 번호 변경</h1>
      <p className="text-xs text-gray--500">
        휴대폰 번호 변경을 위해 휴대폰 본인 인증을 필요로 합니다.
        <br />
        변경하실 휴대폰 번호를 입력 후, 인증하기를 눌러주세요.
      </p>
      <form
        className="mt-[80px] w-[450px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PhoneAuth
          register={register}
          watch={watch}
          errors={errors}
          touchedFields={touchedFields}
          setHasPhone={setHasPhone}
          isPhoneAuth={isPhoneAuth}
          setIsPhoneAuth={setIsPhoneAuth}
          isCodeMatch={isCodeMatch}
          setIsCodeMatch={setIsCodeMatch}
        />
        {isCodeMatch && (
          <p className="text-sm">
            휴대폰 번호 인증이 완료되었습니다.
            <br />
            <strong>변경</strong> 버튼을 누르시면 정상적으로 번호가 변경됩니다.
          </p>
        )}
        <div className="mt-[40px] flex gap-[12px] justify-center">
          <button
            className={`text-red-500 text-sm rounded-lg px-[24px] py-[8px] ${!isCodeMatch ? 'cursor-not-allowed bg-gray--100 text-white' : 'bg-red--100'}`}
            type="submit"
            disabled={!isCodeMatch}
          >
            변경
          </button>
          <button
            className="text-blue--500 text-sm border border-blue--200 rounded-lg px-[24px] py-[8px]"
            type="button"
            onClick={closeWindow}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}

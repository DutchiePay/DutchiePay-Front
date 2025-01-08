'use client';

import { useEffect, useState } from 'react';

import PhoneAuth from '@/app/_components/_user/_phone/PhoneAuth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function ChangeNumber() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const { refreshAccessToken } = useReissueToken();
  const {
    register,
    watch,
    handleSubmit,
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
  }, [isLoggedIn, access]);

  const onSubmit = async (formData) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/phone`,
        { phone: formData.phone },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const changedNumber = formData.phone.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1****$3'
      );

      window.opener.postMessage(
        { type: 'UPDATE_PHONE', phone: changedNumber },
        window.location.origin
      );

      window.close();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await onSubmit(formData);
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
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
          setValue={setValue}
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

'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import EmailInput from './EmailInput';
import Link from 'next/link';
import PhoneAuth from './PhoneAuth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function FindSubmit({ tab, setIsFindEmail }) {
  const router = useRouter();
  const [phoneCode, setPhoneCode] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onblur',
    shouldFocusError: true,
  });

  const email = watch('email');

  const onSubmit = async (formData) => {
    console.log(formData);
    if (tab === '아이디(이메일) 찾기') {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/email`,
          { phone: formData.phone }
        );
        setIsFindEmail(response.data.email);
      } catch (error) {
        console.log(error);
        // 에러 문구 표시
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd`,
          { email: formData.email, phone: formData.phone }
        );

        // reset 이동하기 전에 email을 저장할 방법 결정해야 함.
        router.push('/reset');
      } catch {}
    }
  };

  useEffect(() => {
    reset();
  }, [tab]);

  return (
    <>
      {tab === '아이디(이메일) 찾기' && (
        <div className="mt-[40px] min-h-[425px]">
          <p>
            가입 시 등록한 <strong>휴대폰 번호</strong>로 인증하시면
            <br />
            이메일 주소의 <strong>일부</strong>를 알려드립니다.
          </p>
          <small className="text-red--500">
            ※ 소셜로그인(카카오, 네이버)로 가입한 계정은 이용이 불가능합니다.
          </small>

          <form
            className="mt-[40px] flex flex-col gap-[8px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PhoneAuth
              register={register}
              watch={watch}
              errors={errors}
              setPhoneCode={setPhoneCode}
              isAuthError={isAuthError}
              touchedFields={touchedFields}
              setHasPhone={setHasPhone}
            />
            <button
              type="submit"
              className={`mt-[24px] ${isValid ? 'user__button-blue' : 'user__button-gray cursor-not-allowed'} `}
              disabled={!isValid}
            >
              아이디(이메일) 찾기
            </button>
            <Link
              href="/"
              className="text-gray--500 text-sm text-center underline"
              role="button"
            >
              메인으로 돌아가기
            </Link>
          </form>
        </div>
      )}
      {tab === '비밀번호 재설정' && (
        <div className="mt-[40px]">
          <p>
            가입하신 <strong>이메일 주소</strong>와 <strong>휴대폰 번호</strong>
            로 인증해주시면
            <br />
            비밀번호를 <strong>재설정</strong> 하실 수 있습니다.
          </p>
          <small className="text-red--500">
            ※ 소셜로그인(카카오, 네이버)로 가입한 계정은 이용이 불가능합니다.
          </small>

          <form
            className="mt-[40px] flex flex-col gap-[8px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <EmailInput
              register={register}
              errors={errors}
              email={email}
              touchedFields={touchedFields}
            />

            <PhoneAuth
              register={register}
              watch={watch}
              errors={errors}
              setPhoneCode={setPhoneCode}
              isAuthError={isAuthError}
              touchedFields={touchedFields}
              setHasPhone={setHasPhone}
            />
            <button
              type="submit"
              className={`mt-[24px] ${isValid ? 'user__button-blue' : 'user__button-gray cursor-not-allowed'} `}
              disabled={!isValid}
            >
              비밀번호 재설정
            </button>
            <Link
              href="/"
              className="text-gray--500 text-sm text-center underline"
              role="button"
            >
              메인으로 돌아가기
            </Link>
          </form>
        </div>
      )}
    </>
  );
}

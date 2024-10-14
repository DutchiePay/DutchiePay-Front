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
  const [hasPhone, setHasPhone] = useState(false); // 휴대폰 입력 여부 (회원가입 때문에 강제됨)
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true); // 이메일 사용 가능 여부 (회원가입 때문에 강제됨)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const email = watch('email');

  const onSubmit = async (formData) => {
    if (tab === '아이디(이메일) 찾기') {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/email`,
          { phone: formData.phone }
        );
        setIsFindEmail(response.data.email);
      } catch (error) {
        if (error.response.data.message === '해당하는 유저가 없습니다.') {
          alert('입력하신 전화번호로 등록된 계정이 존재하지 않습니다.');
        } else if (
          error.response.data.message === '정지된 회원입니다.' ||
          error.response.data.message === '탈퇴한 회원입니다.'
        ) {
          alert(
            '해당 계정은 정지 또는 탈퇴되어 사용이 불가능한 계정입니다.\n고객센터로 문의 바랍니다.'
          );
        }
      }
    } else {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd`, {
          email: formData.email,
          phone: formData.phone,
        });

        sessionStorage.setItem('emailForReset', formData.email);
        router.push('/reset');
      } catch (error) {
        if (error.response.data.message === '해당하는 유저가 없습니다.') {
          alert(
            '입력하신 전화번호와 이메일에 일치하는 계정이 존재하지 않습니다.'
          );
        }
      }
    }
  };

  useEffect(() => {
    reset();
    setIsPhoneAuth(false);
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
              touchedFields={touchedFields}
              setHasPhone={setHasPhone}
              isPhoneAuth={isPhoneAuth}
              setIsPhoneAuth={setIsPhoneAuth}
              isCodeMatch={isCodeMatch}
              setIsCodeMatch={setIsCodeMatch}
            />
            <button
              type="submit"
              className={`mt-[24px] ${isCodeMatch === true && isValid ? 'user__button-blue' : 'user__button-gray cursor-not-allowed'} `}
              disabled={!(isCodeMatch === true && isValid)}
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
              setError={setError}
              clearErrors={clearErrors}
              email={email}
              touchedFields={touchedFields}
              isEmailAvailable={isEmailAvailable}
              setIsEmailAvailable={setIsEmailAvailable}
            />

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
            <button
              type="submit"
              className={`mt-[24px] ${isCodeMatch === true && isValid ? 'user__button-blue' : 'user__button-gray cursor-not-allowed'} `}
              disabled={!(isCodeMatch === true && isValid)}
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

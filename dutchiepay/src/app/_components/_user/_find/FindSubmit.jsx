'use client';

import { useEffect, useState } from 'react';

import EmailInput from '@/app/_components/_user/_input/EmailInput';
import FindDescription from '@/app/_components/_user/_find/FindDescription';
import GoToMain from '@/app/_components/_user/GoToMain';
import PhoneAuth from '@/app/_components/_user/_phone/PhoneAuth';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function FindSubmit({ tab, setIsFindEmail }) {
  const router = useRouter();
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
    watch,
    setError,
    clearErrors,
    setValue,
    trigger,
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
  }, [tab, reset]);

  return (
    <div className="mt-[40px] min-h-[450px]">
      <FindDescription tab={tab} />
      <form
        className="mt-[40px] flex flex-col gap-[8px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {tab === '비밀번호 재설정' && (
          <EmailInput
            register={register}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
            email={email}
            touchedFields={touchedFields}
          />
        )}
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
          trigger={trigger}
        />
        <button
          type="submit"
          className={`mt-[24px] w-full py-[8px] px-[24px] font-semibold rounded text-center ${isCodeMatch === true && isValid ? 'bg-blue--500 text-white' : 'bg-gray--100 text-white cursor-not-allowed'} `}
          disabled={!(isCodeMatch === true && isValid)}
        >
          {tab}
        </button>
        <GoToMain />
      </form>
    </div>
  );
}

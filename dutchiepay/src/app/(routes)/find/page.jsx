'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import FindSuccess from '@/app/_components/_user/FindSuccess';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Find() {
  const [tab, setTab] = useState('아이디(이메일) 찾기');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onblur',
    shouldFocusError: true,
  });

  const handleTab = (e) => {
    setTab(e.target.innerText);
    setIsSuccess(false);
    reset();
  };

  const onSubmit = (formData) => {
    console.log(formData);
    if (tab === '아이디(이메일) 찾기') setIsSuccess(true);
    else {
      router.push(`/reset?email=${formData.email}`);
    }
  };

  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return (
    <main className="flex flex-col items-center justify-center min-h-[890px]">
      <h1>
        <Link href="/">
          <Image
            className="w-[200px] h-[120px] mb-[16px]"
            src={logo}
            alt="더취페이"
            width={200}
            height={120}
          />
        </Link>
      </h1>
      <div className="flex justify-center">
        <div
          className={`user-find__header ${tab === '아이디(이메일) 찾기' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          아이디(이메일) 찾기
        </div>
        <div
          className={`user-find__header ${tab === '비밀번호 재설정' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          비밀번호 재설정
        </div>
      </div>
      <section className="mb-[32px] w-[500px]">
        {isSuccess ? (
          <FindSuccess />
        ) : (
          <>
            {tab === '아이디(이메일) 찾기' && (
              <div className="mt-[40px] min-h-[405px]">
                <p className="mb-[40px]">
                  가입 시 등록한 <strong>휴대폰 번호</strong>를 입력하시면
                  <br />
                  이메일 주소의 <strong>일부</strong>를 알려드립니다.
                </p>

                <form
                  className="flex flex-col gap-[12px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex gap-[8px] items-baseline">
                    <label className="user__label">휴대폰 번호</label>
                    <p className="ml-[8px] text-sm">
                      -을 제외한 번호를 입력해주세요
                    </p>
                  </div>
                  <input
                    className="user__input"
                    placeholder="휴대폰 번호 (ex : 01012345678)"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    type="text"
                    {...register('phone', {
                      required: '휴대폰 번호를 입력해주세요.',
                      pattern: {
                        value: rPhone,
                        message: '올바른 휴대폰 번호 형식을 입력해주세요',
                      },
                    })}
                  />
                  <p
                    className="text-sm text-red--500 font-medium min-h-[20px]"
                    role="alert"
                    aria-hidden={errors.phone ? 'true' : 'false'}
                  >
                    {errors.phone && errors.phone.message}
                  </p>
                  <button
                    type="submit"
                    className={`${isValid ? 'user__button-blue' : 'user__button-gray'} `}
                    disabled={!isValid}
                  >
                    아이디(이메일) 찾기
                  </button>
                </form>
              </div>
            )}
            {tab === '비밀번호 재설정' && (
              <div className="mt-[40px]">
                <p className="mb-[40px]">
                  가입 시 등록한 <strong>휴대폰 번호</strong>와
                  <strong>이메일 주소</strong>를 입력하시면
                  <br />
                  비밀번호를 <strong>재설정</strong> 하실 수 있습니다.
                </p>

                <form
                  className="flex flex-col gap-[12px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="user__label">이메일 주소</label>
                  <input
                    className="user__input"
                    placeholder="이메일 주소"
                    type="text"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email', {
                      required: '이메일 주소를 입력해주세요.',
                      pattern: {
                        value: rEmail,
                        message: '올바른 이메일 형식을 입력해주세요',
                      },
                    })}
                  />
                  <p
                    className="text-sm text-red--500 font-medium min-h-[20px]"
                    role="alert"
                    aria-hidden={errors.email ? 'true' : 'false'}
                  >
                    {errors.email && errors.email.message}
                  </p>
                  <div className="flex gap-[8px] items-baseline">
                    <label className="user__label">휴대폰 번호</label>
                    <p className="ml-[8px] text-sm">
                      -을 제외한 번호를 입력해주세요
                    </p>
                  </div>
                  <input
                    className="user__input"
                    placeholder="휴대폰 번호 (ex : 01012345678)"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    type="text"
                    {...register('phone', {
                      required: '휴대폰 번호를 입력해주세요.',
                      pattern: {
                        value: rPhone,
                        message: '올바른 휴대폰 번호 형식을 입력해주세요',
                      },
                    })}
                  />
                  <p
                    className="text-sm text-red--500 font-medium min-h-[20px]"
                    role="alert"
                    aria-hidden={errors.phone ? 'true' : 'false'}
                  >
                    {errors.phone && errors.phone.message}
                  </p>
                  <button
                    type="submit"
                    className={`${isValid ? 'user__button-blue' : 'user__button-gray'} `}
                    disabled={!isValid}
                  >
                    비밀번호 재설정
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

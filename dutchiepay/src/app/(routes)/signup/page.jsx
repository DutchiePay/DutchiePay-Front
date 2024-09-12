'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import PolicyDetail from '@/app/_components/_user/PolicyDetail';
import axios from 'axios';
import eyeClosed from '../../../../public/image/eyeClosed.svg';
import eyeOpen from '../../../../public/image/eyeOpen.svg';
import getLocation from '@/app/_components/_user/GetLocation';
import kakao from '../../../../public/image/kakao.png';
import logo from '../../../../public/image/logo.jpg';
import naver from '../../../../public/image/naver.png';
import { useForm } from 'react-hook-form';
import PhoneAuth from '@/app/_components/_user/PhoneAuth';
export default function Signup() {
  // 비밀번호 입력 시 비밀번호 type에 따라 보이게 할 지 결정하는 변수
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // 비밀번호 확인 입력 시 type에 따라 보이게 할 지 결정하는 변수
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  // 더취페이 정책을 자세하게 볼지 정하는 변수
  const [isShowPolicy, setIsShowPolicy] = useState(false);
  // 주소 저장 변수
  const [address, setAddress] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [isAuthError, setIsAuthError] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{8,}$/;
  const rNickname = /^[a-zA-Z0-9가-힣]{2,8}$/;
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const nickname = watch('nickname');
  const email = watch('email');
  useEffect(() => {
    if (password) {
      trigger('confirmPassword');
    }
  }, [password, trigger]);

  const onSubmit = async (formData) => {
    const {
      confirmPassword,
      policy,
      authCode,
      name = '',
      ...userData
    } = formData;
    console.log('authCode ===' + authCode);
    console.log('phoneCode ===' + phoneCode);
    // 전화번호가 제공된 경우에만 전화번호 인증 코드 검증
    if (phoneCode && authCode !== phoneCode) {
      console.log('인증번호 틀림');
      setIsAuthError(true); // 인증 오류 상태 업데이트
      return; // 함수 종료하여 회원가입 진행 방지
    }

    const payload = {
      ...userData,
      location: address,
      name: userData.name || null, // userData.name이 빈 문자열일 경우 null 처리
    };
    console.log(payload);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        payload
      );
      console.log('회원가입 성공:', response.data);
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getLocation();
      setAddress(location);
    };

    fetchLocation();
  }, []);

  const handleAuthSuccess = (code) => {
    setPhoneCode(code); // PhoneAuth에서 넘어온 코드값 저장
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[880px]">
      <Link href="/" className="mt-[80px]">
        <Image
          className="w-[200px] h-[120px] mb-[8px]"
          src={logo}
          alt="logo"
          width={200}
          height={120}
        />
      </Link>

      <h2 className="text-[20px] font-bold text-start w-[500px] mb-[16px]">
        간편 회원가입
      </h2>
      <section className="w-[500px]">
        <div className="flex gap-[20px] h-[70px]">
          <button
            className="user-signup__button bg-[#00c73c] text-white"
            type="button"
          >
            <Image src={naver} width={40} height={40} alt="naver" />
            <p>네이버로 시작하기</p>
          </button>
          <button className="user-signup__button bg-[#FBDB44]">
            <Image src={kakao} width={40} height={40} alt="kakao" />
            <span>카카오로 시작하기</span>
          </button>
        </div>
        <hr className="w-[500px] my-[10px] border-t-[2px] border-gray--300" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[4px] mt-[8px]"
        >
          {/* 이메일 section */}
          <div>
            <label className="user__label">이메일</label>
            <input
              className={`user__input mt-[4px] ${
                errors.email
                  ? 'user__input__invalid'
                  : rEmail.test(email) && 'user__input__valid'
              }`}
              type="text"
              placeholder="이메일"
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: rEmail,
                  message: '올바른 이메일 형식을 입력해주세요',
                },
              })}
            />
            <p
              className={`text-sm min-h-[20px] mt-[8px] ${
                errors.email
                  ? 'text-red--500'
                  : rEmail.test(email) && 'text-blue--500'
              }`}
              role="alert"
              aria-hidden={errors.email ? 'true' : 'false'}
            >
              {errors.email
                ? errors.email.message
                : rEmail.test(email) && '사용가능한 이메일 입니다.'}
            </p>
          </div>
          {/* 비밀번호 section */}
          <div>
            <div className="flex items-center">
              <label className="user__label" htmlFor="password">
                비밀번호
              </label>
              <span className="ml-[8px] text-[12px]">
                영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
              </span>
            </div>
            <div className="mb-[8px] flex relative">
              <input
                id="password"
                className={`user__input-password mt-[4px] ${
                  errors.password
                    ? 'user__input-password__invalid'
                    : rPassword.test(password) && 'user__input-password__valid'
                }`}
                placeholder="비밀번호"
                type={isPasswordVisible ? 'text' : 'password'}
                aria-required="true"
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 8,
                    message: '8글자 이상 입력해주세요',
                  },
                  pattern: {
                    value: rPassword,
                    message: '올바른 비밀번호 형식을 입력해주세요',
                  },
                })}
              />
              {password && (
                <Image
                  className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                  src={isPasswordVisible ? eyeOpen : eyeClosed}
                  alt="eyes"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                />
              )}
            </div>
            <p
              className={`text-sm font-medium min-h-[20px] ${errors.password ? 'text-red--500' : 'text-blue--500'}`}
              role="alert"
              aria-hidden={errors.password ? 'true' : 'false'}
            >
              {errors.password
                ? errors.password.message
                : rPassword.test(password) && '사용가능한 비밀번호 입니다.'}
            </p>
          </div>
          {/* 비밀번호 확안 section */}
          <div>
            <div className="flex items-center">
              <label className="user__label" htmlFor="confirmPassword">
                비밀번호 확인
              </label>
              <span className="ml-[8px] text-[12px]">
                비밀번호를 한 번 더 입력해주세요
              </span>
            </div>
            <div className="mb-[8px] flex relative">
              <input
                id="confirmPassword"
                className={`user__input-password mt-[4px] ${
                  rPassword.test(password) &&
                  (errors.confirmPassword
                    ? 'user__input-password__invalid'
                    : !errors.confirmPassword &&
                      touchedFields.confirmPassword &&
                      'user__input-password__valid')
                }`}
                placeholder="비밀번호 확인"
                aria-required="true"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                {...register('confirmPassword', {
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
              {confirmPassword && (
                <Image
                  className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                  src={isConfirmPasswordVisible ? eyeOpen : eyeClosed}
                  alt="eyes"
                  onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                />
              )}
            </div>
            <p
              className={`text-sm font-medium min-h-[20px] ${errors.confirmPassword ? 'text-red--500' : 'text-blue--500'}`}
              role="alert"
              aria-hidden={errors.confirmPassword ? 'true' : 'false'}
            >
              {rPassword.test(password) &&
                (errors.confirmPassword
                  ? errors.confirmPassword.message
                  : !errors.confirmPassword &&
                    touchedFields.confirmPassword &&
                    '비밀번호가 일치합니다.')}
            </p>
          </div>
          {/* 닉네임 section */}
          <div>
            <div className="flex items-center">
              <label className="user__label">닉네임</label>
              <span className="ml-[8px] text-[12px]">
                한글, 영문, 숫자만을 포함하여 2글자 이상 8글자 이하
              </span>
            </div>
            <div className="flex relative">
              <input
                className={`user__input mt-[4px] ${
                  errors.nickname
                    ? 'user__input__invalid'
                    : !errors.nickname && touchedFields.nickname
                      ? 'user__input__valid'
                      : ''
                }`}
                placeholder="닉네임"
                type="text"
                maxLength={8}
                aria-required="true"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요',
                  pattern: {
                    value: rNickname,
                    message: '올바른 닉네임 형식을 입력해주세요',
                  },
                })}
              />
            </div>
            <p
              className={`text-sm min-h-[20px] ${
                touchedFields.nickname && errors.nickname
                  ? 'text-red--500'
                  : 'text-blue--500'
              }`}
              role="alert"
              aria-hidden={errors.nickname ? 'true' : 'false'}
            >
              {errors.nickname
                ? errors.nickname.message
                : rNickname.test(nickname) && '사용가능한 닉네임 입니다.'}
            </p>
          </div>
          {/* 성함 section */}
          <div>
            <label className="user__label">성함 (선택)</label>
            <div className="mb-[8px] flex relative">
              <input
                className="user__input mt-[4px] mb-[20px]"
                placeholder="성함"
                type="text"
                {...register('name')}
              />
            </div>
          </div>
          {/* 휴대폰 section */}
          <PhoneAuth
            register={register}
            watch={watch}
            errors={errors}
            touchedFields={touchedFields}
            onAuthSuccess={handleAuthSuccess}
            isAuthError={isAuthError}
          />
          {/* 우리동네 section */}
          <div>
            <label className="user__label">우리동네</label>
            <div className="flex relative">
              <input
                disabled
                className="user__input mt-[4px] bg-gray--100"
                value={address}
                type="text"
              />
            </div>
          </div>
          {/* 약관동의 section */}
          <div className="flex align-start items-center mt-[8px] justify-between">
            <div className="flex align-start items-center">
              <input
                className="signup__checkbox"
                id="signup-policy__checkbox"
                type="checkbox"
                aria-required="true"
                {...register('policy', {
                  required: '정책에 동의하셔야 합니다.',
                })}
              />

              <label
                className="ml-[12px] text-gray-500 cursor-pointer text-sm"
                htmlFor="signup-policy__checkbox"
              >
                <strong>[필수]</strong> 개인정보 수집 동의 및 이용 안내
              </label>
            </div>

            <span
              className="text-end text-2xl cursor-pointer"
              onClick={() => setIsShowPolicy((prev) => !prev)}
            >
              {isShowPolicy ? '-' : '+'}
            </span>
          </div>
          {isShowPolicy && <PolicyDetail />}

          <button
            type="submit"
            className={`px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
              isValid ? 'bg-blue--500' : 'bg-gray--200 cursor-not-allowed'
            }`}
            disabled={!isValid || isSubmitting}
          >
            회원가입
          </button>
          <Link
            href="/"
            className="text-gray--500 text-sm text-center mt-[8px] underline"
            role="button"
          >
            메인으로 돌아가기
          </Link>
          <small className="text-red--400 text-center mb-[80px]">
            메인으로 돌아갈 경우, 지금까지 작성한 내용은 복구할 수 없습니다
          </small>
        </form>
      </section>
    </section>
  );
}

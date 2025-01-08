'use client';

import { useDispatch, useSelector } from 'react-redux';

import AddressInput from './_input/RegionInput';
import PhoneAuth from './_phone/PhoneAuth';
import axios from 'axios';
import { setIsCertified } from '@/redux/slice/loginSlice';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddInfoSubmit() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [isPhoneAuth, setIsPhoneAuth] = useState(false); // 핸드폰 인증 요청 여부
  const [isCodeMatch, setIsCodeMatch] = useState(null);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/location`,
        { location: address },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/phone`,
        { phone: formData.phone },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      dispatch(setIsCertified({ isCertified: true }));
      alert('정상적으로 처리되었습니다. 메인페이지로 이동합니다.');
      router.push('/');
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[4px] mt-[8px]"
    >
      <AddressInput address={address} setAddress={setAddress} />
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
      <button
        type="submit"
        className={`mt-[32px] px-[24px] py-[8px] text-bold w-full rounded-[4px] text-white text-[18px] border-none ${
          !isValid || isSubmitting || isCodeMatch === false
            ? 'bg-gray--200 cursor-not-allowed'
            : 'bg-blue--500'
        }`}
        disabled={!isValid || isSubmitting || isCodeMatch === false}
      >
        저장하기
      </button>
    </form>
  );
}

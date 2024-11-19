'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import GoToMain from './GoToMain';
import PasswordInput from './_input/PasswordInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useLogout from '@/app/hooks/useLogout';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function ResetSubmit({ email }) {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid, touchedFields },
    watch,
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onTouched',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const newPassword = watch('newPassword', '');
  // 훅 호출
  const handleLogout = useLogout(access);

  const fetchUserChangePassword = async (formData) => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-user`,
      {
        password: formData.password,
        newPassword: formData.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEwLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3MzEwNDg2MDh9.9bUbUhueZ0EyM1r4TBr0UTIxdzbAY4JX7TLeAPlfuMA`,
        },
      }
    );
    return response;
  };
  const onSubmit = async (formData) => {
    if (!isLoggedIn || !access) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-nonuser`,
          { email: email, password: formData.newPassword }
        );
        alert('변경이 완료되었습니다.');
        router.push('/');
      } catch (error) {
        if (error.response.data.message === '기존 비밀번호와 동일합니다.') {
          alert('기존과 동일한 비밀번호로 재설정하실 수 없습니다.');
        }
      }
    } else {
      try {
        await fetchUserChangePassword(formData);
        alert('비밀번호가 변경되어 로그아웃되었습니다.');
        await handleLogout();
      } catch (error) {
        if (
          error.response.data.message ===
          '기존 비밀번호와 새로운 비밀번호가 같습니다.'
        ) {
          alert('기존과 동일한 비밀번호로 재설정하실 수 없습니다.');
        } else if (
          error.response.data.message === '기존 비밀번호가 올바르지 않습니다.'
        ) {
          alert('기존 비밀번호가 일치하지 않아 비밀번호를 변경할 수 없습니다.');
        } else if (
          error.response.data.message === '액세스 토큰이 만료되었습니다.'
        ) {
          console.log('새로운 accessToken===' + access);
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await onSubmit(formData);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-[8px] mt-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PasswordInput
        register={register}
        trigger={trigger}
        errors={errors}
        touchedFields={touchedFields}
        password={password}
        confirmPassword={confirmPassword}
        newPassword={newPassword}
        isReset={true}
      />

      <button
        className={`user__button-${isValid ? 'blue' : 'gray'}`}
        type="submit"
        disabled={!isValid}
      >
        비밀번호 재설정
      </button>
      <GoToMain />
    </form>
  );
}

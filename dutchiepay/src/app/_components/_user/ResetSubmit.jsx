'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'universal-cookie';
import Link from 'next/link';
import PasswordInput from './PasswordInput';
import axios from 'axios';
import { logout } from '@/redux/slice/loginSlice';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useLogout from '@/app/hooks/useLogout';

export default function ResetSubmit({ email }) {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const accessToken = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const cookies = new Cookies();

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
  const handleLogout = useLogout(accessToken);
  const onSubmit = async (formData) => {
    if (!isLoggedIn || !accessToken) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-nonuser`,
          { email: email, password: formData.newPassword }
        );
        alert('변경이 완료되었습니다.');
        router.push('/');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('기존 비밀번호와 동일합니다.');
        } else if (error.response && error.response.status === 401) {
          alert('인증되지 않은 사용자입니다.');
          router.push('/');
        } else {
          console.error('비밀번호 변경 중 오류 발생:', error);
        }
      }
    } else {
      try {
        console.log(formData);

        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-user`,
          {
            password: formData.password,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          alert('비밀번호 변경이 완료되었습니다.');
          await handleLogout();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('기존 비밀번호와 동일합니다.');
        } else if (error.response && error.response.status === 401) {
          alert('인증되지 않은 사용자입니다.');
          router.push('/');
        } else {
          console.error('비밀번호 변경 중 오류 발생:', error);
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

      <Link
        href="/"
        className="text-gray--500 text-sm text-center underline"
        role="button"
      >
        메인으로 돌아가기
      </Link>
    </form>
  );
}

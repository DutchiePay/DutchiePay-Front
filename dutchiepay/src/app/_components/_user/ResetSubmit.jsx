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
        if (error.response.data.message === '기존 비밀번호와 동일합니다.') {
          alert('기존과 동일한 비밀번호로 재설정하실 수 없습니다.');
        }
      }
    } else {
      try {
        await axios.patch(
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

        alert('비밀번호 변경이 완료되었습니다.');
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(logout());
        cookies.remove('refresh');
        router.push('/');
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

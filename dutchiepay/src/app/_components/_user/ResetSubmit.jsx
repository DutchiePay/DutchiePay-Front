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

  const onSubmit = async (formData) => {
    if (!isLoggedIn || !accessToken) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-nonuser`,
          { email: email, password: formData.password }
        );
        alert('변경이 완료되었습니다.');
        router.push('/');
      } catch (error) {
        console.error('비밀번호 재설정 중 오류 발생:', error);
        alert('비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.');
      }
    } else {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/pwd-user`,
          { password: formData.password },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
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
        }
      } catch (error) {
        console.error('비밀번호 재설정 중 오류 발생:', error);
        alert('비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.');
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

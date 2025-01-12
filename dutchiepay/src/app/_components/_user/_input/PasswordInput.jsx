'use client';

import ConfirmPassword from './ConfirmPassword';
import CurrentPassword from './CurrentPassword';
import NewPassword from './NewPassword';
import { useEffect } from 'react';

export default function PasswordInput({
  register,
  errors,
  trigger,
  touchedFields,
  password,
  confirmPassword,
  newPassword,
  isReset = false,
}) {
  useEffect(() => {
    // password 값이 변경될 때 비밀번호 확인 필드 유효성 검사를 트리거
    trigger('confirmPassword');
  }, [newPassword, trigger]);

  return (
    <>
      {isReset && (
        <CurrentPassword
          register={register}
          touchedFields={touchedFields}
          errors={errors}
          password={password}
        />
      )}
      <NewPassword
        register={register}
        touchedFields={touchedFields}
        errors={errors}
        newPassword={newPassword}
        isReset={isReset}
      />
      <ConfirmPassword
        register={register}
        touchedFields={touchedFields}
        errors={errors}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
      />
    </>
  );
}

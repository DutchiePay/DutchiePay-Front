import '@/styles/globals.css';
import '@/styles/user.css';

import ConfirmPassword from './ConfirmPassword';
import CurrentPassword from './CurrentPassword';
import NewPassword from './NewPassword';

export default function PasswordInput({
  register,
  errors,
  touchedFields,
  password,
  confirmPassword,
  newPassword,
  isReset = false,
}) {
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

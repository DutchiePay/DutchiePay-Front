'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

export default function NameInput({ register }) {
  return (
    <>
      <label className="user__label">성함 (선택)</label>
      <div className="mb-[8px] flex relative">
        <input
          className="user__input mt-[4px] mb-[20px]"
          placeholder="성함"
          type="text"
          {...register('name')}
        />
      </div>
    </>
  );
}

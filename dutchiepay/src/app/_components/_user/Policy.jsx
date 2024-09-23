'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import PolicyDetail from './PolicyDetail';
import { useState } from 'react';

export default function Policy({ register }) {
  const [isShowPolicy, setIsShowPolicy] = useState(false); // 정책 표시 여부

  return (
    <>
      <div className="flex items-center mt-[8px] justify-between">
        <div className="flex items-center">
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
    </>
  );
}

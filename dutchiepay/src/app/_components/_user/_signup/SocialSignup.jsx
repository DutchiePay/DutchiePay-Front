'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import SocialSignupButton from './SocialSignupButton';
import useOAuthLogin from '@/app/hooks/useOauthLogin';

export default function SocialSignup() {
  useOAuthLogin();

  return (
    <>
      <h2 className="text-[20px] font-bold text-start w-[500px] mb-[16px]">
        간편 회원가입
      </h2>
      <div className="w-[500px] flex justify-between">
        <SocialSignupButton type={'naver'} />
        <SocialSignupButton type={'kakao'} />
      </div>
    </>
  );
}

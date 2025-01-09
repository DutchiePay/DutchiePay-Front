'use client';

import SocialButton from './SocialButton';
import useOAuthLogin from '@/app/hooks/useOauthLogin';

export default function SocialLogin() {
  useOAuthLogin();

  return (
    <section>
      <h2 className="user-login-sns__title flex items-center font-bold">
        &nbsp;SNS 계정으로 로그인&nbsp;
      </h2>
      <div className="flex mt-[24px] gap-[60px] items-center justify-center">
        <SocialButton type={'naver'} />
        <SocialButton type={'kakao'} />
      </div>
    </section>
  );
}

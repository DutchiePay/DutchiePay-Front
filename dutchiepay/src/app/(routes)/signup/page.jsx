import '@/styles/globals.css';
import '@/styles/user.css';

import Link from 'next/link';
import Logo from '@/app/_components/Logo';
import SignUpSubmit from '@/app/_components/_user/SignUpSubmit';
import SocialSignup from '@/app/_components/_user/SocialSignup';

export default function Signup() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[880px] pt-[60px]">
      <Logo />
      <SocialSignup />
      <hr className="w-[500px] my-[10px] border-t-[2px] border-gray--300" />
      <section className="w-[500px]">
        <SignUpSubmit />
        <div className="flex flex-col">
          <Link
            href="/"
            className="text-gray--500 text-sm text-center mt-[8px] underline"
            role="button"
          >
            메인으로 돌아가기
          </Link>
          <small className="text-red--400 text-center mb-[80px]">
            메인으로 돌아갈 경우, 지금까지 작성한 내용은 복구할 수 없습니다
          </small>
        </div>
      </section>
    </section>
  );
}

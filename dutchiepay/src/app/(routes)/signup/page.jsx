import GoToMain from '@/app/_components/_user/GoToMain';
import Logo from '@/app/_components/_user/Logo';
import SignUpSubmit from '@/app/_components/_user/_signup/SignUpSubmit';
import SocialSignup from '@/app/_components/_user/_signup/SocialSignup';

export default function Signup() {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[880px] pt-[60px]">
      <Logo />
      <SocialSignup />
      <hr className="w-[500px] my-[10px] border-t-[2px] border-gray--300" />
      <section className="w-[500px]">
        <SignUpSubmit />
        <div className="flex flex-col">
          <GoToMain />
          <small className="text-red--400 text-center mb-[80px]">
            메인으로 돌아갈 경우, 지금까지 작성한 내용은 복구할 수 없습니다
          </small>
        </div>
      </section>
    </section>
  );
}

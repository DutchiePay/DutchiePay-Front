import LoginSubmit from '@/app/_components/_user/_login/LoginSubmit';
import Logo from '@/app/_components/_user/Logo';
import SocialLogin from '@/app/_components/_user/_login/SocialLogin';

export default function Login() {
  return (
    <section className="w-full min-h-[890px] flex flex-col gap-[16px] items-center justify-center">
      <Logo />
      <article className="text-center mb-[32px] w-[450px]">
        <LoginSubmit />
        <SocialLogin />
      </article>
    </section>
  );
}

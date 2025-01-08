import Link from 'next/link';

export default function LoginButton() {
  return (
    <div className="flex flex-col gap-[8px] mt-[12px]">
      <button
        type="submit"
        className="w-full py-[8px] px-[24px] font-semibold rounded bg-blue--500 text-white text-center border border-blue--500"
      >
        로그인
      </button>
      <Link
        href="/signup"
        className="w-full py-[8px] px-[24px] font-semibold rounded bg-white text-blue--500 text-center border border-blue--500"
        role="button"
      >
        회원가입
      </Link>
    </div>
  );
}

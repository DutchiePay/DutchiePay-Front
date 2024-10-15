import '@/styles/globals.css';
import '@/styles/user.css';

import Link from 'next/link';

export default function LoginButton() {
  return (
    <div className="flex flex-col gap-[8px] mt-[12px]">
      <button type="submit" className="user__button-blue">
        로그인
      </button>
      <Link href="/signup" className="user__button-white" role="button">
        회원가입
      </Link>
    </div>
  );
}

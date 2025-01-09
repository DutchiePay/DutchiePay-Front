import Link from 'next/link';

export default function RememberMe({ setIsRememberMe }) {
  return (
    <div className="flex justify-between items-center mt-[8px] mb-[32px]">
      <div className="flex items-center gap-[8px]">
        <input
          id="remeberMe"
          type="checkbox"
          className="login__checkbox"
          onChange={(e) => setIsRememberMe(e.target.checked)}
        />
        <label
          className="text-gray--500 text-sm hover:text-black"
          htmlFor="remeberMe"
        >
          자동 로그인
        </label>
      </div>
      <Link href="/find" className="text-sm text-gray--500 hover:text-black">
        아이디/비밀번호 찾기
      </Link>
    </div>
  );
}

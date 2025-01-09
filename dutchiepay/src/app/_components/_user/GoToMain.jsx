import Link from 'next/link';

export default function GoToMain() {
  return (
    <Link
      href="/"
      className="mt-[24px] text-gray--500 text-sm text-center underline"
      role="button"
    >
      메인으로 돌아가기
    </Link>
  );
}

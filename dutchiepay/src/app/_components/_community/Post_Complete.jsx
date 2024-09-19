import '@/styles/community.css';
import '@/styles/globals.css';

import Link from 'next/link';

export default function Post_Complete() {
  return (
    <Link
      href="/mart/detail?postId=123"
      className="flex justify-between items-center cursor-pointer"
    >
      <p className="text-sm text-gray--500">
        나눔합니다 클립식 충전식 필요하신분
      </p>
      <p className="text-xs text-gray--500">07월 21일</p>
    </Link>
  );
}

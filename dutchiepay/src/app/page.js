import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="mt-[10px] min-h-[750px] p-[8px] flex flex-wrap gap-[10px]">
      <Link href="/login" className="border p-[10px]">
        로그인 바로가기
      </Link>
      <Link href="/signup" className="border p-[10px]">
        회원가입 바로가기
      </Link>
      <Link href="/find" className="border p-[10px]">
        계정찾기 바로가기
      </Link>
      <Link href="/mypage/info" className="border p-[10px]">
        정보수정 바로가기
      </Link>
      <Link href="/mypage/myorder" className="border p-[10px]">
        주문내역 바로가기
      </Link>
      <Link href="/mypage/myreview" className="border p-[10px]">
        후기내역 바로가기
      </Link>
      <Link href="/mypage/myask" className="border p-[10px]">
        문의내역 바로가기
      </Link>
      <Link href="/mypage/like" className="border p-[10px]">
        좋아요 상품 바로가기
      </Link>
      <Link href="/mypage/mypost" className="border p-[10px]">
        활동내역 바로가기
      </Link>
      <Link href="/commerce" className="border p-[10px]">
        공동구매 바로가기
      </Link>
      <Link href="/commerce/123" className="border p-[10px]">
        공동구매 상세페이지 바로가기
      </Link>
    </div>
  );
}

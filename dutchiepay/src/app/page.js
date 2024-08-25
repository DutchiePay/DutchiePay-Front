import Image from 'next/image';

export default function Home() {
  return (
    <div className="mt-[10px] h-[1000px] p-[8px]">
      <a href="/login" className="border p-[10px]">
        로그인 페이지 바로가기
      </a>
      <a href="/signup" className="border p-[10px]">
        회원가입 페이지 바로가기
      </a>
      <a href="/find" className="border p-[10px]">
        계정찾기 페이지 바로가기
      </a>
    </div>
  );
}

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Link from 'next/link';

export default function EventSection() {
  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <article className="w-full h-[200px] flex justify-between">
      <div className="w-[500px] h-[200px] rounded-xl border">이벤트</div>
      <Link
        href="/introduction"
        className="w-[500px] h-[200px] rounded-xl intro__image relative"
      >
        <div className="flex flex-col absolute top-[60px] left-[24px]">
          <p className="text-2xl font-semibold">
            <strong>더취페이</strong>가 처음이라면?
          </p>
          <p className="text-xl font-medium">
            지금 바로 <strong className="text-2xl">이 곳</strong>을 클릭!
          </p>
          <p className="text-sm">#더취페이 #이용안내</p>
        </div>
      </Link>
    </article>
  );
}
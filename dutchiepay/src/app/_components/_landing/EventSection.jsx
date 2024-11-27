import Image from 'next/image';
import Link from 'next/link';
import intro from '/public/image/intro.jpg';

export default function EventSection() {
  return (
    <article className="w-full h-[200px] flex justify-between">
      <div className="w-[500px] h-[200px] rounded-xl border">이벤트</div>
      <Link
        href="/introduction"
        className="w-[500px] h-[200px] rounded-xl relative"
      >
        <Image
          className="w-[500px] h-[200px] rounded-xl"
          src={intro}
          alt="intro"
          fill
        />
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

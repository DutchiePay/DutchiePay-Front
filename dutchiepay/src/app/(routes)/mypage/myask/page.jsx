import '../../../../styles/mypage.css';

import Ask from '@/app/_components/Ask';
import Image from 'next/image';

export default function MyAsk() {
  return (
    <main className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">문의내역</h1>
      <section className="flex flex-col gap-[16px] mt-[16px]">
        <Ask />
        <Ask />
        <Ask />
        <Ask />
      </section>
    </main>
  );
}

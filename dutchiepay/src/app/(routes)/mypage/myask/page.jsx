import '../../../../styles/mypage.css';

import Image from 'next/image';
import MyAsks from '@/app/_components/MyAsk';

// 문의내역 없을 때 UI도 구현해야 함
export default function MyAsk() {
  return (
    <main className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">문의내역</h1>
      <section className="flex flex-col gap-[16px] mt-[16px]">
        <MyAsks />
        <MyAsks />
        <MyAsks />
        <MyAsks />
      </section>
    </main>
  );
}

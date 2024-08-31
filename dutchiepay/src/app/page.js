import '@/styles/globals.css';
import '@/styles/landing.css';

import Image from 'next/image';
import Link from 'next/link';
import Product_Main from './_components/Product_Main';

export default function Home() {
  return (
    <main className="min-h-[750px] flex flex-col gap-[60px] mb-[100px]">
      <section className="h-[430px] border">carousel 영역</section>
      <section className="w-full mx-auto my-0">
        <h2 className="main__title">새로 등록된 공구</h2>
        <div className="mt-[24px] flex justify-between">
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
        </div>
      </section>
      <section>
        <div className="flex gap-[12px] items-center justify-center">
          <h2 className="main__title">더취페이 추천</h2>
          <div className="h-[25px] border border-gray--300 rounded-xl px-[8px] text-sm text-gray--500 font-semibold flex items-center">
            AD
          </div>
        </div>
        <div className="h-[400px]">상품 carousel</div>
      </section>
      <section className="w-full h-[200px] flex justify-between">
        <div className="w-[500px] h-[200px] rounded-xl border">이벤트</div>
        <div className="w-[500px] h-[200px] rounded-xl border">사이트 소개</div>
      </section>
      <section>
        <h2 className="main__title">가장 HOT🔥한</h2>
        <div className="h-[400px]">상품 carousel</div>
      </section>
    </main>
  );
}

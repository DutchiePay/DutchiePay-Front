'use client';

import '@/styles/globals.css';
import '@/styles/landing.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Link from 'next/link';
import MainCarousel from './_components/_landing/MainCarousel';
import HotCarousel from './_components/_landing/HotCarousel';
import Product_Main from './_components/_landing/Product_Main';
import RecommendCarousel from './_components/_landing/RecommendCarousel';

export default function Home() {
  return (
    <main className="min-h-[750px] flex flex-col gap-[60px] mb-[100px]">
      <section className="h-[400px] border">
        <MainCarousel />
      </section>
      <section className="w-full mx-auto my-0">
        <h2 className="main__title">최근 공구가 시작됐어요!</h2>
        <div className="mt-[8px] flex justify-between">
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
        </div>
      </section>

      {/* 더취페이 추천 Section */}
      <section>
        <RecommendCarousel />
      </section>
      {/* 이벤트 및 소개 Section */}
      <section className="w-full h-[200px] flex justify-between">
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
      </section>

      <section>
        <HotCarousel />
      </section>
    </main>
  );
}

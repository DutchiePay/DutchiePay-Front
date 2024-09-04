'use client';
import '@/styles/globals.css';
import '@/styles/landing.css';

import Image from 'next/image';
import Link from 'next/link';
import MainCarousel from './_components/carousel/MainCarousel';
import RecommendCarousel from './_components/carousel/RecommendCarousel';
import Product_Hot from './_components/Product_Hot';
import Product_Main from './_components/Product_Main';
import intro from '../../public/image/intro.jpg';
import { useRef } from 'react';

export default function Home() {
  const carouselRef = useRef(null);

  const handleSlideChange = (index) => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(index);
    }
  };
  return (
    <main className="min-h-[750px] flex flex-col gap-[60px] mb-[100px]">
      <section className="h-[400px] border">
        <MainCarousel />
      </section>
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
        <div className="flex items-center justify-between mb-[16px]">
          <div className="flex-grow flex justify-center items-center gap-[12px]">
            <h2 className="main__title">더취페이 추천</h2>
            <div className="h-[25px] border border-gray--300 rounded-xl px-[8px] text-sm text-gray--500 font-semibold flex items-center">
              AD
            </div>
          </div>
          <div className="flex gap-[8px]">
            <button className="px-[8px] border bg-blue--200 text-white rounded-full">
              1
            </button>
            <button className="px-[8px] border bg-blue--200 text-white rounded-full">
              2
            </button>
          </div>
        </div>
        <div className="h-[400px]">
          <RecommendCarousel />
        </div>
      </section>

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
        <h2 className="main__title">가장 HOT🔥한</h2>
        <Product_Hot />
      </section>
    </main>
  );
}

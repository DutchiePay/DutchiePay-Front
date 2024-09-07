'use client';

import '@/styles/globals.css';
import '@/styles/landing.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image from 'next/image';
import Link from 'next/link';

import MainCarousel from './_components/_landing/MainCarousel';
import Product_Hot from './_components/_landing/Product_Hot';
import Product_Main from './_components/_landing/Product_Main';
import RecommendCarousel from './_components/_landing/RecommendCarousel';
import { useRef } from 'react';

export default function Home() {
  const recommendCarouselRef = useRef(null);
  const hotCarouselRef = useRef(null);

  const [activeRecommendSlide, setActiveRecommendSlide] = useState(0);
  const [activeHotSlide, setActiveHotSlide] = useState(0);
  const [currentHotItems, setCurrentHotItems] = useState(0);

  const handleRecommendSlideChange = (index) => {
    if (recommendCarouselRef.current) {
      recommendCarouselRef.current.slickGoTo(index);

      setActiveRecommendSlide(index);
    }
  };

  const handleHotSlideChange = (index) => {
    if (hotCarouselRef.current) {
      hotCarouselRef.current.slickGoTo(0);
    }
    setActiveHotSlide(index);
    setCurrentHotItems(index);
  };
  // 슬라이드 변경 시 호출될 함수
  const handleRecommendCarouselSlideChange = (currentIndex) => {
    setActiveRecommendSlide(currentIndex >= 3 ? 3 : 0); // 인덱스에 따라 버튼 활성화
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

      {/* 더취페이 추천 Section */}
      <section>
        <div className="flex items-center justify-between mb-[16px] relative">
          <div className="flex-grow flex justify-center items-center gap-[12px]">
            <h2 className="main__title ml-[65px] ">더취페이 추천</h2>
            <div className="h-[25px] border border-gray--300 rounded-xl px-[8px] text-sm text-gray--500 font-semibold flex items-center">
              AD
            </div>
          </div>
          <div className="absolute bottom-[0px] left-[900px] w-[200px]">
            <button
              onClick={() => handleRecommendSlideChange(0)}
              className={`px-[8px] mx-[8px] ${
                activeRecommendSlide === 0
                  ? 'border bg-blue--200 text-white rounded-full'
                  : ''
              }`}
            >
              1
            </button>
            <button
              onClick={() => handleRecommendSlideChange(3)}
              className={`px-[8px] ${
                activeRecommendSlide === 3
                  ? 'border bg-blue--200 text-white rounded-full'
                  : ''
              }`}
            >
              2
            </button>
          </div>
        </div>
        <div className="h-[400px]">
          <RecommendCarousel
            ref={recommendCarouselRef}
            onSlideChange={handleRecommendCarouselSlideChange}
          />
        </div>
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
        <div className="relative">
          <h2 className="main__title">가장 HOT🔥한</h2>
          <div className="absolute bottom-[0px] left-[900px] w-[200px]">
            <button
              onClick={() => handleHotSlideChange(0)}
              className={`px-[8px] mx-[8px] ${
                activeHotSlide === 0
                  ? 'border bg-blue--200 text-white rounded-full'
                  : ''
              }`}
            >
              1
            </button>
            <button
              onClick={() => handleHotSlideChange(1)}
              className={`px-[8px] ${
                activeHotSlide === 1
                  ? 'border bg-blue--200 text-white rounded-full'
                  : ''
              }`}
            >
              2
            </button>
          </div>
        </div>
        <div className="flex mt-[10px]">
          <Product_Hot ref={hotCarouselRef} currentItems={currentHotItems} />
        </div>
      </section>
    </main>
  );
}

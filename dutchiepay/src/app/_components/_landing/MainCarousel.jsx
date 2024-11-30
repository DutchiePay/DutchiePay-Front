'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import carousel1 from '/public/image/carousel/carousel1.jpg';
import carousel2 from '/public/image/carousel/carousel2.jpg';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
});
const MainCarouselInfo = dynamic(() => import('./MainCarouselInfo'));
const MainArrow = dynamic(() => import('./MainArrow'));

export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  const handleNextClick = useCallback(() => sliderRef.current?.slickNext(), []);
  const handlePrevClick = useCallback(() => sliderRef.current?.slickPrev(), []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: isAutoPlay,
    autoplaySpeed: 10000,
    prevArrow: <MainArrow direction="prev" onClick={handlePrevClick} />,
    nextArrow: <MainArrow direction="next" onClick={handleNextClick} />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <article className="w-[1020px] h-[400px] relative">
      <Slider className="w-[1020px]" ref={sliderRef} {...settings}>
        <Link href="/mart" className="h-[400px] relative">
          <Image
            className="w-full h-[400px] object-cover"
            src={carousel1}
            alt="더취페이 메인"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="flex flex-col gap-[4px] absolute top-[120px] left-[40px]">
            <span className="text-3xl flex font-semibold">
              우리 지역<p className="text-blue--500">&nbsp;마트&nbsp;</p>구매
            </span>
            <strong className="text-5xl">같이 구매 하실 분?</strong>
            <p className="text-sm">
              더취페이에선 자취생도 대용량 상품 걱정 없이 구매 가능!
            </p>
          </div>
        </Link>
        <Link href="/commerce" className="h-[400px] relative">
          <Image
            className="h-full w-[400px] object-cover"
            src={carousel2}
            alt="더취페이 메인"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="flex flex-col gap-[4px] absolute top-[120px] left-[40px]">
            <p className="text-3xl flex font-semibold">
              자취 생활을 더 알뜰하게!
            </p>
            <strong className="text-5xl flex">
              <p className="text-blue--500">공동구매</p>로 필요한 것만 딱!
            </strong>
            <p className="text-sm">
              더취페이에서 자취생 맞춤 제품 필요한 것만 알뜰하게 구매하세요!
            </p>
          </div>
        </Link>
      </Slider>
      <MainCarouselInfo
        isAutoPlay={isAutoPlay}
        setIsAutoPlay={setIsAutoPlay}
        sliderRef={sliderRef}
        currentSlide={currentSlide}
        handleNextClick={handleNextClick}
        handlePrevClick={handlePrevClick}
      />
    </article>
  );
}

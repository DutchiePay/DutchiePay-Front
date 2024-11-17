'use client';

import '@/styles/community.css';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import carousel1 from '../../../../public/image/carousel/carousel1.jpg';
import carousel2 from '../../../../public/image/carousel/carousel2.jpg';
import pause from '../../../../public/image/pause.svg';
import play from '../../../../public/image/play.svg';
import prevNnext from '../../../../public/image/prevNnext.svg';

// 화살표 컴포넌트
const ArrowButton = ({ direction, onClick }) => (
  <button
    className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
    onClick={onClick}
  >
    <Image
      src={prevNnext}
      alt={`${direction} arrow`}
      width={18}
      height={18}
      className={direction === 'next' ? 'rotate-180' : ''}
    />
  </button>
);
export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  const handleNextClick = useCallback(() => sliderRef.current?.slickNext(), []);
  const handlePrevClick = useCallback(() => sliderRef.current?.slickPrev(), []);

  // 슬라이드 제어 함수
  const handleSlideAction = useCallback((action) => {
    if (sliderRef.current) {
      sliderRef.current[action]();
    }
  }, []);

  // 자동 재생 토글 함수
  const toggleAutoPlay = useCallback(() => {
    handleSlideAction(isAutoPlay ? 'slickPause' : 'slickPlay');
    setIsAutoPlay((prev) => !prev);
  }, [isAutoPlay, handleSlideAction]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: isAutoPlay,
    autoplaySpeed: 10000,
    prevArrow: <ArrowButton direction="prev" onClick={handlePrevClick} />,
    nextArrow: <ArrowButton direction="next" onClick={handleNextClick} />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <article className="w-[1020px] h-[400px] relative">
      <Slider className="w-[1020px]" ref={sliderRef} {...settings}>
        <Link href="/mart" className="h-[400px] relative">
          <Image
            className="w-full h-[400px]"
            src={carousel1}
            alt="더취페이 메인"
            fill
            style={{ objectFit: 'cover' }}
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
            className="h-full w-[400px]"
            src={carousel2}
            alt="더취페이 메인"
            fill
            style={{ objectFit: 'cover' }}
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
      <div className="absolute bottom-[24px] right-[40px] flex gap-[16px] items-center">
        <div className="w-[44px] h-[24px] bg-black/30 text-white text-xs flex justify-center items-center rounded-2xl">
          <strong>{currentSlide + 1}</strong>&nbsp;/&nbsp;2
        </div>
        <div className="flex gap-[16px]">
          <ArrowButton direction="prev" onClick={handlePrevClick} />
          <button
            className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
            onClick={toggleAutoPlay}
          >
            {isAutoPlay ? (
              <Image src={pause} alt="pause" width={25} height={30} />
            ) : (
              <Image src={play} alt="play" width={20} height={20} />
            )}
          </button>
          <ArrowButton direction="next" onClick={handleNextClick} />
        </div>
      </div>
    </article>
  );
}

'use client';

import '@/styles/community.css';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import carousel1 from '../../../../public/image/carousel/carousel1.jpg';
import pause from '../../../../public/image/pause.svg';
import play from '../../../../public/image/play.svg';
import prevNnext from '../../../../public/image/prevNnext.svg';

const PrevArrow = ({ onClick }) => (
  <button
    className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
    onClick={onClick}
  >
    <Image src={prevNnext} alt="prev" width={18} height={18} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
    onClick={onClick}
  >
    <Image
      className="rotate-180"
      src={prevNnext}
      alt="next"
      width={18}
      height={18}
    />
  </button>
);

export default function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handlePlay = () => {
    sliderRef.current.slickPlay();
  };
  const handlePause = () => {
    sliderRef.current.slickPause();
  };

  const toggleAutoPlay = () => {
    if (!isAutoPlay) handlePlay();
    else handlePause();
    setIsAutoPlay(!isAutoPlay);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: isAutoPlay,
    autoplaySpeed: 100000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className="w-[1020px] h-[400px] relative">
      <Slider className="w-[1020px]" ref={sliderRef} {...settings}>
        <section className="h-[400px] relative">
          <Image
            className="h-full"
            src={carousel1}
            alt="더취페이 메인"
            width={1020}
            height={400}
            unoptimized
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
        </section>
        <div>
          <h3>2</h3>
        </div>
      </Slider>
      <div className="absolute bottom-[24px] right-[40px] flex gap-[16px] items-center">
        <div className="w-[44px] h-[24px] bg-black/30 text-white text-xs flex justify-center items-center rounded-2xl">
          <strong>{currentSlide + 1}</strong>&nbsp;/&nbsp;2
        </div>
        <div className="flex gap-[16px]">
          <PrevArrow onClick={handlePrevClick} />
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
          <NextArrow onClick={handleNextClick} />
        </div>
      </div>
    </div>
  );
}

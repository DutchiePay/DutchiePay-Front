'use client';

import '@/styles/community.css';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { forwardRef, useCallback, useMemo, useRef } from 'react';

import Image from 'next/image';
import Product_Main from './Product_Main';
import RecommendCarouselArrow from '../../../../public/image/arrow/RecommendCarouselArrow.svg';
import Slider from 'react-slick';

// 화살표 컴포넌트 분리
const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} className={`${direction}`}>
    <Image
      src={RecommendCarouselArrow}
      alt={`${direction} arrow`}
      width={20}
      height={20}
      className={direction === 'next' ? 'rotate-180' : ''}
    />
  </button>
);

// 메인 컴포넌트
const RecommendCarousel = forwardRef((props, ref) => {
  const sliderRef = useRef(null);

  const handleNextClick = useCallback(() => sliderRef.current?.slickNext(), []);
  const handlePrevClick = useCallback(() => sliderRef.current?.slickPrev(), []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <div className="flex items-center w-[1020px] h-[300px] justify-between">
      <ArrowButton direction="prev" onClick={handlePrevClick} />
      <Slider
        className="w-[720px]"
        ref={(node) => {
          if (ref) ref.current = node;
          sliderRef.current = node;
        }}
        {...settings}
      >
        <Product_Main />
        <Product_Main />
        <Product_Main />
        <Product_Main />
        <Product_Main />
        <Product_Main />
      </Slider>
      <ArrowButton direction="next" onClick={handleNextClick} />
    </div>
  );
});

export default RecommendCarousel;

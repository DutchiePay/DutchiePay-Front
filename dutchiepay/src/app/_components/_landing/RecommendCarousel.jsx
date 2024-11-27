import { useCallback, useRef, useState } from 'react';

import CarouselIndex from './CarouselIndex';
import ContentLoader from 'react-content-loader';
import Image from 'next/image';
import RecommendCarouselArrow from '/public/image/arrow/RecommendCarouselArrow.svg';
import Slider from 'react-slick';
import dynamic from 'next/dynamic';

const MainProduct = dynamic(() => import('./MainProduct'), {
  loading: () => (
    <ContentLoader
      speed={2}
      width={240}
      height={312}
      viewBox="0 0 240 312"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="12" y="8" rx="10" ry="10" width="216" height="210" />
      <rect x="12" y="226" rx="4" ry="4" width="200" height="24" />
      <rect x="12" y="254" rx="4" ry="4" width="150" height="28" />
      <rect x="12" y="286" rx="4" ry="4" width="120" height="18" />
    </ContentLoader>
  ),
});

const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer absolute top-2/4 z-10 translate-y-[-50%] ${direction === 'prev' ? 'left-[-100px]' : 'right-[-100px]'}`}
  >
    <Image
      src={RecommendCarouselArrow}
      alt={`${direction} arrow`}
      width={20}
      height={20}
      className={direction === 'next' ? 'rotate-180' : ''}
    />
  </button>
);

const RecommendCarousel = ({ recommendProduct }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextClick = useCallback(() => sliderRef.current?.slickNext(), []);
  const handlePrevClick = useCallback(() => sliderRef.current?.slickPrev(), []);

  const handleSlideChange = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      setActiveSlide(index);
    }
  };

  const handleRecommendCarouselSlideChange = (currentIndex) => {
    setActiveSlide(currentIndex >= 4 ? 4 : 0);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    afterChange: handleRecommendCarouselSlideChange,
  };

  return (
    <article>
      <div className="flex items-center justify-between mb-[16px] relative">
        <div className="flex-grow flex justify-center items-center gap-[12px]">
          <h2 className="text-3xl font-black text-center ml-[65px]">
            더취페이가 추천해요!
          </h2>
          <div className="h-[25px] border border-gray-300 rounded-xl px-[8px] text-sm text-gray-500 font-semibold flex items-center">
            AD
          </div>
        </div>
        <CarouselIndex
          end={4}
          activeSlide={activeSlide}
          handleSlideChange={handleSlideChange}
        />
      </div>
      <div className="flex items-center relative main__recommendCarousel">
        <ArrowButton direction="prev" onClick={handlePrevClick} />
        <Slider className="w-[1020px] mx-auto " ref={sliderRef} {...settings}>
          {recommendProduct.map((item, key) => {
            return <MainProduct key={key} product={item} />;
          })}
        </Slider>
        <ArrowButton direction="next" onClick={handleNextClick} />
      </div>
    </article>
  );
};

export default RecommendCarousel;

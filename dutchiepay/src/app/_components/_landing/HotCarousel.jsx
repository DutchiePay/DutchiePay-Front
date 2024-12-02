import { useRef, useState } from 'react';

import ContentLoader from 'react-content-loader';
import Slider from 'react-slick';
import dynamic from 'next/dynamic';

const CarouselIndex = dynamic(() => import('./CarouselIndex'));

const HotRanking = dynamic(() => import('./HotRanking'), {
  loading: () => (
    <ContentLoader
      speed={2}
      width={1020}
      height={210}
      viewBox="0 0 1020 210"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="5" rx="0" ry="0" width="200" height="200" />
      <rect x="216" y="25" rx="4" ry="4" width="220" height="20" />
      <rect x="216" y="49" rx="4" ry="4" width="230" height="56" />
      <rect x="216" y="110" rx="4" ry="4" width="130" height="28" />
      <rect x="340" y="140" rx="4" ry="4" width="110" height="36" />
      <rect x="529" y="5" rx="4" ry="4" width="488" height="30" />
      <rect x="529" y="45" rx="4" ry="4" width="488" height="30" />
      <rect x="529" y="85" rx="4" ry="4" width="488" height="30" />
      <rect x="529" y="125" rx="4" ry="4" width="488" height="30" />
      <rect x="529" y="165" rx="4" ry="4" width="488" height="30" />
    </ContentLoader>
  ),
});

export default function HotCarousel({ hotProduct }) {
  const [slideChange, setSlideChange] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderWrapper = useRef(null);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
    sliderWrapper.current.slickGoTo(index);
  };

  const settingsWrapper = {
    dots: false,
    infinite: false,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    vertical: true,
    arrows: false,
    beforeChange: (current, next) => {
      setActiveSlide(next);
    },
    afterChange: () => {
      setSlideChange(true);
    },
  };

  return (
    <article>
      <div className="relative">
        <h2 className="text-3xl font-black text-center">가장 HOT🔥한</h2>
        <CarouselIndex
          end={1}
          activeSlide={activeSlide}
          handleSlideChange={handleSlideChange}
        />
      </div>
      <div className="w-[1020px] mt-[12px]">
        <Slider ref={sliderWrapper} {...settingsWrapper}>
          <HotRanking
            products={hotProduct.slice(0, 5)}
            isFirst={true}
            wrapper={sliderWrapper}
            slideChange={slideChange}
            setSlideChange={setSlideChange}
            wrapperActiveSlide={activeSlide}
          />
          <HotRanking
            products={hotProduct.slice(5)}
            isFirst={false}
            wrapper={sliderWrapper}
            slideChange={slideChange}
            setSlideChange={setSlideChange}
            wrapperActiveSlide={activeSlide}
          />
        </Slider>
      </div>
    </article>
  );
}

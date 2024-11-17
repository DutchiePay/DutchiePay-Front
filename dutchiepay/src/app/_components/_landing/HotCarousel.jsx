import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useRef, useState } from 'react';

import CarouselIndex from './CarouselIndex';
import HotRanking from './HotRanking';
import Slider from 'react-slick';

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
        <h2 className="main__title">가장 HOT🔥한</h2>
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

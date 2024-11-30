import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useRef, useState } from 'react';

import HotProduct from './HotProduct';
import ProductRank from './ProductRank';
import Slider from 'react-slick';

export default function HotRanking({
  products,
  isFirst,
  wrapper,
  slideChange,
  setSlideChange,
  wrapperActiveSlide,
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (slideChange) {
      sliderRef.current.slickGoTo(0);
      sliderRef.current.slickPlay();
      setSlideChange(false);
    }
  }, [slideChange, setSlideChange]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    vertical: true,
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => {
      if (current === 4) {
        setTimeout(() => {
          if (
            wrapper.current &&
            ((!isFirst && wrapperActiveSlide === 1) ||
              (isFirst && wrapperActiveSlide === 0))
          ) {
            wrapper.current.slickGoTo(isFirst ? 1 : 0);
          }
        }, 3000);
      }
    },
  };

  return (
    <div className="flex">
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div key={index}>
            <HotProduct product={product} />
          </div>
        ))}
      </Slider>
      <ProductRank
        products={products}
        isFirst={isFirst}
        activeSlide={activeSlide}
      />
    </div>
  );
}

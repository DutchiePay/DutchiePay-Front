'use client';

import ContentLoader from 'react-content-loader';
import Slider from 'react-slick';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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

export default function NewCarousel({ newProduct }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  return (
    <section className="w-full mx-auto my-0">
      <h2 className="text-3xl font-black text-center">
        최근 공구가 시작됐어요!
      </h2>
      <div className="mt-[8px] flex justify-between">
        <Slider className="w-[1022px] mx-auto" {...settings}>
          {newProduct.map((item, key) => (
            <MainProduct
              key={key}
              product={item}
              isHidden={key !== activeSlide}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
}

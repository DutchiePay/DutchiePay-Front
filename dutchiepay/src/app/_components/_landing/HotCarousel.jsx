import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useRef, useState, useEffect } from 'react';
import Product_Hot from './Product_Hot';

export default function HotCarousel() {
  const handleHotSlideChange = (index) => {
    setActiveSlide(index);
    if (index == 1) {
      sliderTopFive.current.slickGoTo(0);
    } else {
      sliderBottomFive.current.slickGoTo(0);
    }
    sliderWrapper.current.slickGoTo(index); // 올바른 슬라이드로 이동
  };
  const sliderWrapper = useRef(null);
  const sliderTopFive = useRef(null);
  const sliderBottomFive = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlideBottom, setActiveSlideBottom] = useState(0);
  const [activeSlideTop, setActiveSlideTop] = useState(0);
  const settingsTopFive = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    beforeChange: (current, next) => setActiveSlideTop(next),
    afterChange: (current) => {
      if (current === 4) {
        setTimeout(() => {
          if (
            sliderWrapper.current &&
            sliderBottomFive.current &&
            activeSlide === 0
          ) {
            sliderWrapper.current.slickGoTo(1);
            sliderBottomFive.current.slickGoTo(0);
            sliderBottomFive.current.slickPlay();
          }
        }, 1000);
      } else if (current === 9) {
        // 10번째 슬라이드일 때
        setTimeout(() => {
          if (
            sliderWrapper.current &&
            sliderBottomFive.current &&
            activeSlide === 0
          ) {
            sliderWrapper.current.slickGoTo(0); // 첫 번째 슬라이드로 돌아감
            sliderBottomFive.current.slickGoTo(0);
            sliderBottomFive.current.slickPlay();
          }
        }, 1000);
      }
    },
  };
  useEffect(() => {
    if (sliderTopFive.current) {
      sliderTopFive.current.slickPlay();
    }
  }, []);
  const settingsWrapper = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    vertical: true,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const settingsBottomFive = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    beforeChange: (current, next) => setActiveSlideBottom(next),
    afterChange: (current) => {
      if (current === 4) {
        setTimeout(() => {
          if (
            sliderWrapper.current &&
            sliderTopFive.current &&
            activeSlide === 1
          ) {
            sliderWrapper.current.slickGoTo(0); // 1~5위 슬라이더로 이동
            sliderTopFive.current.slickGoTo(0);
            sliderTopFive.current.slickPlay();
          }
        }, 1000);
      } else if (current === 9) {
        // 10번째 슬라이드일 때
        setTimeout(() => {
          if (
            sliderWrapper.current &&
            sliderTopFive.current &&
            activeSlide === 1
          ) {
            sliderWrapper.current.slickGoTo(0); // 첫 번째 슬라이드로 돌아감
            sliderTopFive.current.slickGoTo(0);
            sliderTopFive.current.slickPlay();
          }
        }, 1000);
      }
    },
  };
  //추후 데이터 들어오면 Link title 글자수 제한 코드 추가 필요
  return (
    <>
      <div className="relative">
        <h2 className="main__title">가장 HOT🔥한</h2>
        <div className="absolute bottom-[0px] left-[900px] w-[200px]">
          <button
            onClick={() => handleHotSlideChange(0)}
            className={`px-[8px] mx-[8px] ${
              activeSlide === 0
                ? 'border bg-blue--200 text-white rounded-full'
                : ''
            }`}
          >
            1
          </button>
          <button
            onClick={() => handleHotSlideChange(1)}
            className={`px-[8px] ${
              activeSlide === 1
                ? 'border bg-blue--200 text-white rounded-full'
                : ''
            }`}
          >
            2
          </button>
        </div>
      </div>
      <div className="w-[1020px]  flex flex-row">
        <Product_Hot
          settingsBottomFive={settingsBottomFive}
          sliderTopFive={sliderTopFive}
          settingsTopFive={settingsTopFive}
          activeSlideTop={activeSlideTop}
          sliderBottomFive={sliderBottomFive}
          activeSlideBottom={activeSlideBottom}
          sliderWrapper={sliderWrapper}
          settingsWrapper={settingsWrapper}
        />
      </div>
    </>
  );
}

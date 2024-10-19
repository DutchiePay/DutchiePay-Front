import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Product_Main from './Product_Main';
import RecommendCarouselArrow from '../../../../public/image/arrow/RecommendCarouselArrow.svg';
import Slider from 'react-slick';
import '@/styles/landing.css';
// 화살표 컴포넌트 분리
const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} className={`main__arrow-button ${direction}`}>
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
const Prodect_Recommend = () => {
  const sliderRef = useRef(null);
  const [activeRecommendSlide, setActiveRecommendSlide] = useState(0);

  const handleNextClick = useCallback(() => sliderRef.current?.slickNext(), []);
  const handlePrevClick = useCallback(() => sliderRef.current?.slickPrev(), []);
  const handleRecommendSlideChange = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      setActiveRecommendSlide(index);
    }
  };
  // 슬라이드 변경 시 호출될 함수
  const handleRecommendCarouselSlideChange = (currentIndex) => {
    setActiveRecommendSlide(currentIndex >= 4 ? 4 : 0); // 인덱스에 따라 버튼 활성화
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
    <>
      <div className=" flex items-center justify-between mb-[16px] relative">
        <div className="flex-grow flex justify-center items-center gap-[12px]">
          <h2 className="main__title ml-[65px]">더취페이가 추천해요!</h2>
          <div className="h-[25px] border border-gray-300 rounded-xl px-[8px] text-sm text-gray-500 font-semibold flex items-center">
            AD
          </div>
        </div>
        <div className="absolute bottom-[0px] left-[900px] w-[200px]">
          <button
            onClick={() => handleRecommendSlideChange(0)}
            className={`px-[8px] mx-[8px] ${
              activeRecommendSlide === 0
                ? 'border bg-blue-200 text-white rounded-full'
                : ''
            }`}
          >
            1
          </button>
          <button
            onClick={() => handleRecommendSlideChange(4)}
            className={`px-[8px] ${
              activeRecommendSlide === 4
                ? 'border bg-blue-200 text-white rounded-full'
                : ''
            }`}
          >
            2
          </button>
        </div>
      </div>
      <div className="flex items-center h-[300px]relative main__recommendCarousel">
        <ArrowButton direction="prev" onClick={handlePrevClick} />
        <Slider className="w-[1022px] mx-auto " ref={sliderRef} {...settings}>
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
          <Product_Main />
        </Slider>
        <ArrowButton direction="next" onClick={handleNextClick} />
      </div>
    </>
  );
};

export default Prodect_Recommend;

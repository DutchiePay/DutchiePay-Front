'use client';

import '@/styles/community.css';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRef, useState } from 'react';

import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';
import RecommendCarouselArrow from '../../../../public/image/arrow/RecommendCarouselArrow.svg';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';

export default function RecommendCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const PrevArrow = ({ onClick }) => (
    <button className="" onClick={onClick}>
      <Image src={RecommendCarouselArrow} alt="prev" width={20} height={20} />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button className="" onClick={onClick}>
      <Image
        className="rotate-180"
        src={RecommendCarouselArrow}
        alt="next"
        width={20}
        height={20}
      />
    </button>
  );

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <>
      <div className="flex items-center w-[1020px] h-[400px] justify-between">
        <PrevArrow onClick={handlePrevClick} />
        <Slider className="w-[720px] " ref={sliderRef} {...settings}>
          <Link
            href="/commerce/123"
            title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
            className="w-[240px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
          >
            <Image
              className="w-full h-[210px] rounded-xl"
              src={product}
              alt="애슐리 볶음밥"
              width={210}
              height={210}
            />
            <p className="title--single-line font-medium mt-[4px]">1</p>
            <div className="flex gap-[8px] items-center">
              <p className="text-[12px] text-gray--500 line-through">
                32,500원
              </p>
              <strong className="text-lg text-blue--500">27,500원</strong>
              <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
                30%
              </p>
            </div>
            <div className="flex items-center gap-[4px]">
              <Image
                className="w-[18px] h-[18px]"
                src={clock}
                alt="남은 시간"
                width={18}
                height={18}
              />
              <p className="text-blue--700 text-[12px] font-semibold">
                12일 08시간 36분 남음
              </p>
            </div>
          </Link>
          <Link
            href="/commerce/123"
            title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
            className="w-[210px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
          >
            <Image
              className="w-full h-[210px] rounded-xl"
              src={product}
              alt="애슐리 볶음밥"
              width={210}
              height={210}
            />
            <p className="title--single-line font-medium mt-[4px]">2</p>
            <div className="flex gap-[8px] items-center">
              <p className="text-[12px] text-gray--500 line-through">
                32,500원
              </p>
              <strong className="text-lg text-blue--500">27,500원</strong>
              <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
                30%
              </p>
            </div>
            <div className="flex items-center gap-[4px]">
              <Image
                className="w-[18px] h-[18px]"
                src={clock}
                alt="남은 시간"
                width={18}
                height={18}
              />
              <p className="text-blue--700 text-[12px] font-semibold">
                12일 08시간 36분 남음
              </p>
            </div>
          </Link>
          <Link
            href="/commerce/123"
            title="애슐리 볶음밥 10인분 혼합 구성 10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침 대용 직장인 도시락"
            className="w-[210px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
          >
            <Image
              className="w-full h-[210px] rounded-xl"
              src={product}
              alt="애슐리 볶음밥"
              width={210}
              height={210}
            />
            <p className="title--single-line font-medium mt-[4px]">3</p>
            <div className="flex gap-[8px] items-center">
              <p className="text-[12px] text-gray--500 line-through">
                32,500원
              </p>
              <strong className="text-lg text-blue--500">27,500원</strong>
              <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
                30%
              </p>
            </div>
            <div className="flex items-center gap-[4px]">
              <Image
                className="w-[18px] h-[18px]"
                src={clock}
                alt="남은 시간"
                width={18}
                height={18}
              />
              <p className="text-blue--700 text-[12px] font-semibold">
                12일 08시간 36분 남음
              </p>
            </div>
          </Link>
        </Slider>
        <NextArrow onClick={handleNextClick} />
      </div>
    </>
  );
}

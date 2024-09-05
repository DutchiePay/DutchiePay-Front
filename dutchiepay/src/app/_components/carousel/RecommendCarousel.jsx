'use client';

import '@/styles/community.css';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useRef, forwardRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import Image from 'next/image';
import RecommendCarouselArrow from '../../../../public/image/arrow/RecommendCarouselArrow.svg';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';

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

// 상품 카드 컴포넌트 분리
const ProductCard = ({ product }) => (
  <Link
    href={`/commerce/${product.productId}`}
    title={product.productName}
    className="w-[240px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
  >
    <Image
      className="w-full h-[210px] rounded-xl"
      src={product.productImg}
      alt={product.productName}
      width={210}
      height={210}
    />
    <p className="title--single-line font-medium mt-[4px]">
      {/* 구분을 위해 productId로 설정 */}
      {product.productId}
    </p>
    <div className="flex gap-[8px] items-center">
      <p className="text-[12px] text-gray--500 line-through">
        {product.productPrice}
      </p>
      <strong className="text-lg text-blue--500">
        {product.discountPrice}
      </strong>
      <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
        {product.discountPercent}
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
        {product.expireDate}
      </p>
    </div>
  </Link>
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

  // 슬라이드 데이터 배열로 관리 (API 대체 예정)
  const slides = useMemo(
    () => [
      {
        productId: 1,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
      {
        productId: 2,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
      {
        productId: 3,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
      {
        productId: 4,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
      {
        productId: 5,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
      {
        productId: 6,
        productName: '애슐리 볶음밥 10인분 혼합 구성 10종',
        productPrice: '32,500원',
        discountPrice: '27,500원',
        discountPercent: '30%',
        expireDate: '12일 08시간 36분 남음',
        productImg: product,
      },
    ],
    []
  );

  return (
    <div className="flex items-center w-[1020px] h-[400px] justify-between">
      <ArrowButton direction="prev" onClick={handlePrevClick} />
      <Slider
        className="w-[720px]"
        ref={(node) => {
          if (ref) ref.current = node;
          sliderRef.current = node;
        }}
        {...settings}
      >
        {slides.map((slide) => (
          <ProductCard key={slide.productId} product={slide} />
        ))}
      </Slider>
      <ArrowButton direction="next" onClick={handleNextClick} />
    </div>
  );
});

export default RecommendCarousel;

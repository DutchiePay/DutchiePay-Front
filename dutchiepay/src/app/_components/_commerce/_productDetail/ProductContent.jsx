'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useEffect, useRef, useState } from 'react';

import Ask from '@/app/_components/_commerce/Ask';
import Company from '@/app/_components/_commerce/_productDetail/Company';
import Image from 'next/image';
import ProductDetailTab from '@/app/_components/_commerce/_productDetail/ProductDetailTab';
import Review from '@/app/_components/_commerce/Review';

export default function ProductContent({ product, productId }) {
  const [tab, setTab] = useState('상품정보');
  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const askRef = useRef(null);

  // 스크롤 위치에 따른 Tab 값 설정
  const handleScroll = () => {
    const reviewTop = reviewRef.current?.getBoundingClientRect().top;
    const askTop = askRef.current?.getBoundingClientRect().top;

    if (reviewTop <= 0 && askTop > 0) {
      setTab('후기');
    } else if (askTop <= 0) {
      setTab('업체정보/문의');
    } else {
      setTab('상품정보');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 작성 리뷰/문의 없을 때 구현해야 함
  return (
    <>
      <ProductDetailTab
        tab={tab}
        setTab={setTab}
        infoRef={infoRef}
        reviewRef={reviewRef}
        askRef={askRef}
      />
      <article className="mb-[60px] min-h-[1000px]">
        <div
          ref={infoRef}
          className="relative mx-auto my-0 relative w-4/5 min-h-[300px] pt-[16px]"
        >
          <Image
            src={product?.productDetail}
            alt="상세정보"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-full h-full"
          />
        </div>
        <hr className="my-[40px]" ref={reviewRef} />
        <Review
          rating={product?.rating}
          reviewCount={product?.reviewCount}
          productId={productId}
          ratingCount={product?.ratingCount}
          photoReviewCount={product?.photoReviewCount}
        />
        <hr className="my-[40px]" ref={askRef} />
        <Company
          company={product?.storeName}
          representative={product?.representative}
          storeAddress={product?.storeAddress}
          contactNumber={product?.contactNumber}
        />
        <Ask
          askCount={product?.askCount}
          productId={productId}
          company={product?.storeName}
        />
      </article>
    </>
  );
}

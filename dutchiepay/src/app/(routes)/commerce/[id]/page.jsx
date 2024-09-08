'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useRef, useState } from 'react';

import Ask from '@/app/_components/_commerce/Ask';
import Company from '@/app/_components/_commerce/Company';
import Image from 'next/image';
import ProductInfo from '@/app/_components/_commerce/ProductInfo';
import RemainingTime from '@/app/_components/_commerce/RemainingTime';
import Review from '@/app/_components/_commerce/Review';
import product from '../../../../../public/image/product1.jpg';
import productDetail from '../../../../../public/image/product_detail.jpg';
import time from '../../../../../public/image/time.svg';

export default function CommerceDetail() {
  const [tab, setTab] = useState('상품정보');
  const [isEnd, setIsEnd] = useState(false); // 마감 여부

  const infoRef = useRef(null);
  const reviewRef = useRef(null);
  const askRef = useRef(null);

  const handleTab = (e) => {
    const selectedTab = e.target.innerText;
    setTab(selectedTab);

    if (selectedTab === '상품정보') {
      infoRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '후기') {
      reviewRef.current.scrollIntoView({ behavior: 'auto' });
    } else if (selectedTab === '업체정보/문의') {
      askRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

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

  const endDateString = '2024-12-25T22:00:00Z'; // 임시 마감 기한

  // 작성 리뷰/문의 없을 때 구현해야 함
  return (
    <main className="min-h-[750px] w-[1020px]">
      <section className="mt-[40px] flex justify-between">
        <div>
          <Image
            className="w-[500px] h-[500px]"
            src={product}
            alt="애슐리 볶음밥"
            width={500}
            height={500}
            unoptimized={true}
          />
          <div className="flex justify-center gap-[12px] py-[4px] items-center text-sm font-semibold bg-gray--200">
            <Image
              className="w-[15px] h-[15px]"
              src={time}
              alt="남은 시간"
              width={15}
              height={15}
            />
            <RemainingTime
              endTime={endDateString}
              isEnd={isEnd}
              setIsEnd={setIsEnd}
            />
          </div>
        </div>
        <ProductInfo isEnd={isEnd} />
      </section>
      <ul className="mt-[40px] flex gap-[52px] border border-2 border-t-black py-[12px] px-[40px] sticky top-[154px] bg-white z-50">
        <li
          className={`${tab === '상품정보' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          상품정보
        </li>
        <li
          className={`${tab === '후기' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          후기
        </li>
        <li
          className={`${tab === '업체정보/문의' ? 'product-tab__item--selected' : ''}`}
          onClick={(e) => handleTab(e)}
        >
          업체정보/문의
        </li>
      </ul>
      <section className="mb-[60px] min-h-[1000px]">
        <div ref={infoRef} className="relative w-auto h-auto pt-[16px]">
          <Image
            className="mx-auto my-0"
            src={productDetail}
            alt="상세정보"
            unoptimized={true}
          />
        </div>
        <hr className="my-[40px]" ref={reviewRef} />
        <Review />
        <hr className="my-[40px]" ref={askRef} />
        <Company />
        <Ask />
      </section>
    </main>
  );
}

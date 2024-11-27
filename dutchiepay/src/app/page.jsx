'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from 'react';

import MainCarousel from './_components/_landing/MainCarousel';
import axios from 'axios';
import dynamic from 'next/dynamic';

const EventSection = dynamic(
  () => import('./_components/_landing/EventSection')
);
const HotCarousel = dynamic(() => import('./_components/_landing/HotCarousel'));
const RecommendCarousel = dynamic(
  () => import('./_components/_landing/RecommendCarousel')
);
const NewCarousel = dynamic(() => import('./_components/_landing/NewCarousel'));

export default function Home() {
  const [newProduct, setNewProduct] = useState(null);
  const [recommendProduct, setRecommendProduct] = useState(null);
  const [hotProduct, setHotProduct] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/main`
        );
        setNewProduct(response.data.newProducts);
        setRecommendProduct(response.data.recommends);
        setHotProduct(response.data.nowHot);
        setIsFetched(true);
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="min-h-[750px] flex flex-col gap-[60px] mb-[100px]">
      <MainCarousel />
      {isFetched && (
        <>
          <NewCarousel newProduct={newProduct} />
          <RecommendCarousel recommendProduct={recommendProduct} />
          <EventSection />
          <HotCarousel hotProduct={hotProduct} />
        </>
      )}
    </section>
  );
}

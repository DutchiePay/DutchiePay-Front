'use client';

import '@/styles/globals.css';
import '@/styles/landing.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from 'react';

import EventSection from './_components/_landing/EventSection';
import HotCarousel from './_components/_landing/HotCarousel';
import MainCarousel from './_components/_landing/MainCarousel';
import NewCarousel from './_components/_landing/NewCarousel';
import RecommendCarousel from './_components/_landing/RecommendCarousel';
import axios from 'axios';

export default function Home() {
  const [newProduct, setNewProduct] = useState(null);
  const [recommendProduct, setRecommendProduct] = useState(null);
  const [hotProduct, setHotProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/main`
        );
        setNewProduct(response.data.newProducts);
        setRecommendProduct(response.data.recommends);
        setHotProduct(response.data.nowHot);
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="min-h-[750px] flex flex-col gap-[60px] mb-[100px]">
      <MainCarousel />
      {newProduct && <NewCarousel newProduct={newProduct} />}
      {recommendProduct && (
        <RecommendCarousel recommendProduct={recommendProduct} />
      )}
      <EventSection />
      {hotProduct && <HotCarousel hotProduct={hotProduct} />}
    </section>
  );
}

'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import ProductContent from '@/app/_components/_commerce/_productDetail/ProductContent';
import ProductHeader from '@/app/_components/_commerce/_productDetail/ProductHeader';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CommerceDetail({ params }) {
  const { id } = params;
  const access = useSelector((state) => state.login.access);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce?buyId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <section className="min-h-[750px] w-[1020px]">
      <ProductHeader product={product} productId={id} />
      <ProductContent product={product} />
    </section>
  );
}

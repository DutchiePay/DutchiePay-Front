'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import ProductContent from '@/app/_components/_commerce/_productDetail/ProductContent';
import ProductHeader from '@/app/_components/_commerce/_productDetail/ProductHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import useRetryFunction from '@/app/hooks/useRetryFunction';
import { useSelector } from 'react-redux';

export default function CommerceDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [product, setProduct] = useState(null);
  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = {};
        if (access) {
          headers.Authorization = `Bearer ${access}`;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce?buyId=${id}`,
          {
            headers,
          }
        );
        setProduct(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          /* 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
          reissueTokenAndRetry(() => fetchProduct());*/
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchProduct();
  }, [access, id]);

  return (
    <section className="min-h-[750px] w-[1020px]">
      {product && (
        <>
          <ProductHeader product={product} productId={id} />
          <ProductContent product={product} productId={id} />
        </>
      )}
    </section>
  );
}

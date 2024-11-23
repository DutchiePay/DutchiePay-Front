'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import ProductContent from '@/app/_components/_commerce/_productDetail/ProductContent';
import ProductHeader from '@/app/_components/_commerce/_productDetail/ProductHeader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function CommerceDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const [product, setProduct] = useState(null);
  const isRefreshing = useRef(false); // 요청 중인지 상태 관리

  const fetchProduct = useCallback(async () => {
    try {
      const headers = {};
      if (access) {
        headers.Authorization = `Bearer ${access}`;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce?buyId=${id}`,
        { headers }
      );
      setProduct(response.data);
    } catch (error) {
      if (error.response?.data?.message === '액세스 토큰이 만료되었습니다.') {
        if (!isRefreshing.current) {
          // 요청 중이 아닐 때만 갱신
          isRefreshing.current = true; // 요청 중으로 설정
          const reissueResponse = await refreshAccessToken();
          isRefreshing.current = false; // 요청 완료

          if (reissueResponse.success) {
            await fetchProduct(); // 토큰 갱신 후 다시 호출
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [access, id, refreshAccessToken]); // 의존성 배열에 필요한 값 추가

  useEffect(() => {
    fetchProduct(); // 컴포넌트 마운트 시 fetchProduct 호출
  }, [fetchProduct]); // fetchProduct를 의존성 배열에 추가

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

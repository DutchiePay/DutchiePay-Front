'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import { FILTERS } from '@/app/_util/constants';
import ProductItem from './ProductItem';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function ProductList({ category, filter, isEndContain }) {
  const access = useSelector((state) => state.login.access);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false); // 요청 중복 방지 플래그
  const observerRef = useRef();

  const fetchProducts = useCallback(
    async (filterType, categoryParam, endParam, cursorParam) => {
      setIsLoading(true);
      try {
        const headers = {};
        if (access) {
          headers.Authorization = `Bearer ${access}`;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/list?filter=${filterType}&${categoryParam}end=${endParam}&${cursorParam}limit=16`,
          {
            headers,
          }
        );

        if (response.data.cursor === null) setHasMore(false);
        setCursor(response.data.cursor);
        setIsInitialized(true);
        return response.data.products;
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          hasFetched.current = false;
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchProducts(
              filterType,
              categoryParam,
              endParam,
              cursorParam
            );
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [access, refreshAccessToken]
  );

  // 필터 변경 시 상태 초기화
  useEffect(() => {
    hasFetched.current = false;
    setProducts([]);
    setCursor(null);
    setHasMore(true);
  }, [filter, isEndContain, category]);

  useEffect(() => {
    const categoryParam = category ? `category=${category}&` : '';
    const endParam = isEndContain ? '1' : '0';

    const loadProducts = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const newProducts = await fetchProducts(
        FILTERS[filter],
        categoryParam,
        endParam,
        ''
      );
      setProducts(newProducts);
    };
    loadProducts();
  }, [category, filter, isEndContain, fetchProducts]);

  const lastProductRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const categoryParam = category ? `category=${category}&` : '';
          const endParam = isEndContain ? '1' : '0';
          const cursorParam = cursor ? `cursor=${cursor}&` : '';
          const loadProducts = async () => {
            const newProducts = await fetchProducts(
              FILTERS[filter],
              categoryParam,
              endParam,
              cursorParam
            );
            setProducts((prevProducts) => [...prevProducts, ...newProducts]);
          };
          loadProducts();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [category, cursor, filter, isLoading, fetchProducts, isEndContain, hasMore]
  );

  return (
    <>
      {!isInitialized || products.length === 0 ? (
        <div className="mx-auto my-auto flex flex-col justify-center items-center">
          <strong className="mt-[8px] text-2xl">
            상품이 존재하지 않습니다.
          </strong>
          <p className="text-gray--500">
            빠른 시일내로 다양한 상품을 구매하실 수 있도록 하겠습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {products.map((item, key) => (
            <ProductItem key={key} item={item} />
          ))}
          <div ref={lastProductRef}>{/* 상품의 마지막 */}</div>
        </div>
      )}
    </>
  );
}

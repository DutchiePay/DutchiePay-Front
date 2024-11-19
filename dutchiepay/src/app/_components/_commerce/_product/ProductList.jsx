'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { CATEGORIES, FILTERS } from '@/app/_util/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

import ProductItem from './ProductItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function ProductList({ category, filter, isEndContain }) {
  const access = useSelector((state) => state.login.access);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { refreshAccessToken } = useReissueToken();

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
    [access]
  );

  useEffect(() => {
    // 초기 상품 목록 불러오기
    const loadProducts = async () => {
      const initialProducts = await fetchProducts('newest', '', '0', '');
      setProducts(initialProducts);
      setIsInitialized(true);
    };
    loadProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // 카테고리와 필터에 따른 상품 목록 불러오기
    if (isInitialized) {
      setHasMore(true);
      const categoryParam = category ? `category=${CATEGORIES[category]}&` : '';
      const endParam = isEndContain ? '1' : '0';
      const loadProducts = async () => {
        const newProducts = await fetchProducts(
          FILTERS[filter],
          categoryParam,
          endParam,
          ''
        );
        setProducts(newProducts);
      };
      loadProducts();
    }
  }, [category, filter, isEndContain, fetchProducts, isInitialized]);

  const lastProductRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const categoryParam = category
            ? `category=${CATEGORIES[category]}&`
            : '';
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

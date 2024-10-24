'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { CATEGORIES, FILTERS } from '@/app/_util/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

import ProductItem from './ProductItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ProductList({ category, filter, isEndContain }) {
  const access = useSelector((state) => state.login.access);
  const [products, setProducts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();

  const fetchProducts = async (
    filterType,
    categoryParam,
    endParam,
    cursorParam
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/list?filter=${filterType}&${categoryParam}end=${endParam}&${cursorParam}limit=16`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response.data.cursor === null) setHasMore(false);
      setCursor(response.data.cursor);
      setIsInitialized(true);
      return response.data.products;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 초기 상품 목록 불러오기
    const loadProducts = async () => {
      const initialProducts = await fetchProducts('newest', '', '0', '');
      setProducts(initialProducts);
      setIsInitialized(true);
    };
    loadProducts();
  }, []);

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
  }, [category, filter, isEndContain]);

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
    [category, cursor, filter, isLoading]
  );

  return (
    <>
      {products.length === 0 ? (
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

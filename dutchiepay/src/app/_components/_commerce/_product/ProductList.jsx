'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { CATEGORIES, FILTERS } from '@/app/_util/constants';
import { useEffect, useState } from 'react';

import ProductItem from './ProductItem';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ProductList({ category, filter, isEndContain }) {
  const [products, setProducts] = useState([]);
  const access = useSelector((state) => state.login.access);
  const [cursor, setCursor] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchProducts = async (filterType, categoryParam, endParam) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/list?filter=${filterType}&${categoryParam}&end=${endParam}&limit=16`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      setCursor(response.data.cursor);
      setProducts(response.data.products);
      setIsInitialized(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 초기 상품 목록 불러오기
    fetchProducts('newest', '', '0');
  }, []);

  useEffect(() => {
    // 카테고리와 필터에 따른 상품 목록 불러오기
    if (isInitialized) {
      const categoryParam = category ? `category=${CATEGORIES[category]}` : '';
      const endParam = isEndContain ? '1' : '0';
      fetchProducts(FILTERS[filter], categoryParam, endParam);
    }
  }, [category, filter, isEndContain, isInitialized]);

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
          <div>{/* 상품의 마지막 */}</div>
        </div>
      )}
    </>
  );
}

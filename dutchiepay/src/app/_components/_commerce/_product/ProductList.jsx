'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { FILTERS } from '@/app/_util/constants';
import ProductItem from './ProductItem';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';

export default function ProductList({ category, filter, isEndContain }) {
  const categoryParam = category ? `category=${category}&` : '';
  const filterParam = FILTERS[filter];
  const endParam = isEndContain ? '1' : '0';
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/list?${categoryParam}filter=${filterParam}&end=${endParam}&limit=16`;
  const {
    items: products,
    isInitialized,
    lastItemRef,
  } = useInfiniteScroll({ fetchUrl });

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
          <div ref={lastItemRef}></div>
        </div>
      )}
    </>
  );
}

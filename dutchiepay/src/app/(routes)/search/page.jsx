'use client';

import { FILTERS } from '@/app/_util/constants';
import Product from '@/app/_components/Product';
import ProductFilter from '@/app/_components/_commerce/_product/ProductFilter';
import SearchContainer from '@/app/_components/_search/SearchContainer';
import SearchEmpty from '@/app/_components/_search/SearchEmpty';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import { useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('최신순');
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/search/commerce?keyword=${keyword}&filter=${FILTERS[filter]}&end=1&limit=16`;
  const {
    items: products,
    isInitialized,
    lastItemRef,
  } = useInfiniteScroll({ fetchUrl });

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <article className="flex flex-col items-center justify-center mt-[60px] mx-auto z-10">
        <h1 className="font-bold text-4xl">상품 검색</h1>
        <small className="mt-[4px] mb-[24px] text-sm">
          더취페이에서 판매하는 공동구매 상품들을 검색할 수 있어요
        </small>
        <SearchContainer keyword={keyword} setKeyword={setKeyword} />
      </article>

      <div className="flex justify-between items-end">
        <h2 className="mt-[60px] text-2xl font-bold">
          &apos;{keyword ? keyword : '검색어 없음'}&apos;&nbsp;에 대한 검색결과
        </h2>
        <ProductFilter filter={filter} setFilter={setFilter} />
      </div>

      {isInitialized && products.length > 0 ? (
        <article className="mt-[24px] grid grid-cols-4 gap-8">
          {products.map((item, key) => (
            <Product key={key} product={item} />
          ))}
          <div ref={lastItemRef}></div>
        </article>
      ) : (
        <SearchEmpty keyword={keyword} />
      )}
    </section>
  );
}

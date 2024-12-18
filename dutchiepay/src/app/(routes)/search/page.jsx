'use client';

import Product_Like from '@/app/_components/Product';
import SearchEmpty from '@/app/_components/_search/SearchEmpty';
import SearchInput from '@/app/_components/_search/SearchInput';
import { useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [hasCommerce, setHasCommerce] = useState(false); // 검색 결과 존재 여부

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <article className="flex flex-col items-center justify-center mt-[60px] mx-auto">
        <h1 className="font-bold text-4xl">상품 검색</h1>
        <small className="mt-[4px] mb-[24px] text-sm">
          더취페이에서 판매하는 공동구매 상품들을 검색할 수 있어요
        </small>
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
      </article>

      <h2 className="mt-[60px] text-2xl font-bold">
        &apos;{keyword ? keyword : '검색어 없음'}&apos;&nbsp;에 대한 검색결과
      </h2>
      {hasCommerce && (
        <article className="mt-[24px]">
          <div className="flex justify-between mt-[12px] px-[12px]">
            <Product_Like />
            <Product_Like />
            <Product_Like />
            <Product_Like />
          </div>
        </article>
      )}
      {!hasCommerce && <SearchEmpty keyword={keyword} />}
    </section>
  );
}

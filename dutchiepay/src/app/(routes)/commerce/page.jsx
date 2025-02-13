'use client';

import ProductFilter from '@/app/_components/_commerce/_product/ProductFilter';
import ProductList from '@/app/_components/_commerce/_product/ProductList';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Commerce() {
  const params = useSearchParams();
  const category = params.get('category');
  const [filter, setFilter] = useState('최신순');
  const [isEndContain, setIsEndContain] = useState(false);

  return (
    <section className="min-h-[750px] w-[1020px]">
      <div className="mt-[60px] flex justify-between">
        <div className="flex items-center">
          <input
            id="include-expired"
            type="checkbox"
            className="input__checkbox"
            onChange={(e) => setIsEndContain(e.target.checked)}
          />
          <label className="ml-[8px] text-sm" htmlFor="include-expired">
            마감포함
          </label>
        </div>
        <ProductFilter filter={filter} setFilter={setFilter} />
      </div>
      <article className="min-h-[400px] flex flex-wrap gap-[30px] mt-[16px] mb-[60px]">
        <ProductList
          category={category}
          filter={filter}
          isEndContain={isEndContain}
        />
      </article>
    </section>
  );
}

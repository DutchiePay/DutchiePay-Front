'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';
import '@/styles/community.css';

import { useParams, useSearchParams } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import Post from '@/app/_components/Post';
import ProductFilter from './_commerce/_product/ProductFilter';
import Product_Like from '@/app/_components/Product';
import { useState } from 'react';

export default function SectionSearch() {
  const searchParams = useSearchParams();
  const { section } = useParams();
  const keyword = searchParams.get('keyword') || '검색어 없음';
  const [filter, setFilter] = useState('최신순');
  const [category, setCategory] = useState('전체');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <h2 className="mt-[40px] text-2xl font-bold">
        &apos;{keyword}&apos;에 대한 검색결과
      </h2>
      {section === 'commerce' && (
        <section className="mt-[24px]">
          <p>
            공동구매 <strong className="text-blue--500">1,300</strong>건
          </p>
          <div className="flex justify-between mt-[16px]">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="include-expired"
                className="input__checkbox"
              />
              <label className="ml-[8px] text-sm" htmlFor="include-expired">
                마감포함
              </label>
            </div>

            <ProductFilter filter={filter} setFilter={setFilter} />
          </div>
          <div className="flex justify-between mt-[12px] px-[12px]">
            <Product_Like />
            <Product_Like />
            <Product_Like />
            <Product_Like />
          </div>
        </section>
      )}
      {section === 'community' && (
        <section className="mt-[24px]">
          <p>
            커뮤니티 <strong className="text-blue--500">300</strong>건
          </p>
          <div className="flex justify-between items-end mt-[16px]">
            <ul className="flex gap-[12px]">
              <li>
                <button
                  className={`community__filter ${category === '전체' && 'community__filter--selected'}`}
                  onClick={() => setCategory('전체')}
                >
                  전체
                </button>
              </li>
              <li>
                <button
                  className={`community__filter ${category === '마트/배달' && 'community__filter--selected'}`}
                  onClick={() => setCategory('마트/배달')}
                >
                  마트/배달
                </button>
              </li>
              <li>
                <button
                  className={`community__filter ${category === '거래/나눔' && 'community__filter--selected'}`}
                  onClick={() => setCategory('거래/나눔')}
                >
                  거래/나눔
                </button>
              </li>
              <li>
                <button
                  className={`community__filter ${category === '커뮤니티' && 'community__filter--selected'}`}
                  onClick={() => setCategory('커뮤니티')}
                >
                  커뮤니티
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-between mt-[16px] px-[12px]">
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </section>
      )}
    </section>
  );
}

'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';
import '@/styles/community.css';

import { useParams, useSearchParams } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import Post from '@/app/_components/Post';
import Product_Like from '@/app/_components/Product';
import arrow from '../../../../../public/image/arrow.svg';
import { useState } from 'react';

export default function SearchSection() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { section } = useParams();
  const keyword = searchParams.get('keyword') || '검색어 없음';
  const [filter, setFilter] = useState('최신순');
  const [category, setCategory] = useState('전체');

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <h2 className="mt-[40px] text-2xl font-bold">
        '{keyword}'에 대한 검색결과
      </h2>
      {section === 'commerce' && (
        <section className="mt-[24px]">
          <p>
            공동구매 <strong className="text-blue--500">1,300</strong>건
          </p>
          <div className="flex justify-between mt-[16px]">
            <div className="flex items-center">
              <input type="checkbox" className="input__checkbox" />
              <label className="ml-[8px] text-sm">마감포함</label>
            </div>

            <ul className="flex">
              <li
                className={`commerce-fillter__item ${filter === '최신순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                최신순
              </li>
              <li
                className={`commerce-fillter__item ${filter === '좋아요순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                좋아요순
              </li>
              <li
                className={`commerce-fillter__item ${filter === '할인율순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                할인율순
              </li>
              <li
                className={`commerce-fillter__item ${filter === '마감임박순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                마감임박순
              </li>
            </ul>
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
        <section className="mt-[40px]">
          <div className="flex justify-between items-center mt-[16px]">
            <p>
              커뮤니티 <strong className="text-blue--500">300</strong>건
            </p>
            <ul className="flex gap-[12px]">
              <li
                className={`community__filter ${category === '전체' && 'community__filter--selected'}`}
                onClick={(e) => setCategory(e.target.innerText)}
              >
                전체
              </li>
              <li
                className={`community__filter ${category === '마트/배달' && 'community__filter--selected'}`}
                onClick={(e) => setCategory(e.target.innerText)}
              >
                마트/배달
              </li>
              <li
                className={`community__filter ${category === '거래/나눔' && 'community__filter--selected'}`}
                onClick={(e) => setCategory(e.target.innerText)}
              >
                거래/나눔
              </li>
              <li
                className={`community__filter ${category === '커뮤니티' && 'community__filter--selected'}`}
                onClick={(e) => setCategory(e.target.innerText)}
              >
                커뮤니티
              </li>
            </ul>

            <ul className="flex">
              <li
                className={`commerce-fillter__item ${filter === '최신순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                최신순
              </li>
              <li
                className={`commerce-fillter__item ${filter === '댓글많은순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                댓글많은순
              </li>
              <li
                className={`commerce-fillter__item ${filter === '조회수순' && 'commerce-fillter__item--selected'}`}
                onClick={(e) => setFilter(e.target.innerText)}
              >
                조회수순
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
    </main>
  );
}

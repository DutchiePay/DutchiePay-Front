'use client';

import '@/styles/mypage.css';

import Image from 'next/image';
import Product_Like from '@/app/_components/Product_Like';
import { useState } from 'react';

// 좋아요 상품 없을 때 UI도 구현해야 함
export default function Like() {
  const [filter, setFilter] = useState('전체');

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };

  return (
    <main className="ml-[250px] p-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">좋아요한 상품</h1>
      <ul className="flex gap-[8px] my-[16px]">
        <li
          className={`mypage__filter ${filter === '전체' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          전체
        </li>
        <li
          className={`mypage__filter ${filter === '신선' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          신선
        </li>
        <li
          className={`mypage__filter ${filter === '냉장' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          냉장
        </li>
        <li
          className={`mypage__filter ${filter === '가구' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          가구
        </li>
        <li
          className={`mypage__filter ${filter === '가전' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          가전
        </li>
        <li
          className={`mypage__filter ${filter === '미용' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          미용
        </li>
        <li
          className={`mypage__filter ${filter === '패브릭' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          패브릭
        </li>
        <li
          className={`mypage__filter ${filter === '생활' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          생활
        </li>
        <li
          className={`mypage__filter ${filter === '주방/청소' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          주방/청소
        </li>
        <li
          className={`mypage__filter ${filter === '잡화' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          잡화
        </li>
        <li
          className={`mypage__filter ${filter === '보안' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          보안
        </li>
      </ul>
      <section className="flex flex-wrap gap-[6px]">
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
        <Product_Like />
      </section>
    </main>
  );
}

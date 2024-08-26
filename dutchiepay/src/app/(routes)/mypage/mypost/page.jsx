'use client';

import '../../../../styles/mypage.css';

import Image from 'next/image';
import Product_Post from '@/app/_components/Product_Post';
import { useState } from 'react';

// 작성 게시글 없을 때 UI도 구현해야 함
export default function MyPost() {
  const [filter, setFilter] = useState('작성한 게시글');

  const handleFilter = (e) => {
    setFilter(e.target.innerText);
  };
  return (
    <main className="ml-[250px] p-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">활동내역</h1>
      <ul className="flex gap-[8px] my-[16px]">
        <li
          className={`mypage__filter ${filter === '작성한 게시글' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          작성한 게시글
        </li>
        <li
          className={`mypage__filter ${filter === '댓글 남긴 게시글' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          댓글 남긴 게시글
        </li>
      </ul>
      <section className="flex flex-wrap gap-[6px]">
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
        <Product_Post />
      </section>
    </main>
  );
}

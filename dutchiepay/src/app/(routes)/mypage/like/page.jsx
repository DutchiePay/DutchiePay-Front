'use client';

import '@/styles/mypage.css';

import { CATEGORIES } from '@/app/_util/constants';
import MypageFilter from '@/app/_components/_mypage/MypageFilter';
import Product_Like from '@/app/_components/Product';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// 좋아요 상품 없을 때 UI도 구현해야 함
export default function Like() {
  const [filter, setFilter] = useState('전체');
  const nickname = useSelector((state) => state.login.user.nickname);

  return (
    <section className="ml-[250px] p-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">좋아요한 상품</h1>
      <small>
        {nickname}님께서 좋아요한 공동구매 상품을 확인할 수 있습니다.
      </small>
      <ul className="flex gap-[8px] my-[16px]">
        {Object.values(CATEGORIES).map((key) => (
          <MypageFilter
            filter={filter}
            setFilter={setFilter}
            filterkey={key}
            key={key}
          />
        ))}
      </ul>
      <section className="flex flex-wrap gap-[16px]">
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
    </section>
  );
}

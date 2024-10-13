'use client';

import '@/styles/mypage.css';

import Image from 'next/image';
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
        <li>
          <button
            className={`mypage__filter ${filter === '전체' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('전체')}
          >
            전체
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '신선' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('신선')}
          >
            신선
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '냉장' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('냉장')}
          >
            냉장
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '가구' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('가구')}
          >
            가구
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '가전' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('가전')}
          >
            가전
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '미용' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('미용')}
          >
            미용
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '패브릭' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('패브릭')}
          >
            패브릭
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '생활' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('생활')}
          >
            생활
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '주방/청소' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('주방/청소')}
          >
            주방/청소
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '잡화' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('잡화')}
          >
            잡화
          </button>
        </li>
        <li>
          <button
            className={`mypage__filter ${filter === '보안' ? `mypage__filter--selected` : ''}`}
            onClick={() => setFilter('보안')}
          >
            보안
          </button>
        </li>
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

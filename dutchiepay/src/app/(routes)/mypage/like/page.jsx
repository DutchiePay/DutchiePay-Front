'use client';

import '@/styles/mypage.css';

import { useEffect, useState } from 'react';

import { CATEGORIES } from '@/app/_util/constants';
import MypageFilter from '@/app/_components/_mypage/MypageFilter';
import Product from '@/app/_components/Product';
import axios from 'axios';
import { useSelector } from 'react-redux';

// 좋아요 상품 없을 때 UI도 구현해야 함
export default function Like() {
  const [filter, setFilter] = useState('전체');
  const [product, setProduct] = useState(null);
  const access = useSelector((state) => state.login.access);
  const nickname = useSelector((state) => state.login.user.nickname);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/like`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    fetchProduct();
  }, [access]);

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
      {product && product.length > 0 ? (
        <section className="flex flex-wrap gap-[16px]">
          {product.map((item, key) => (
            <Product key={key} product={item} />
          ))}
        </section>
      ) : (
        <div>좋아요한 상품이 없음</div>
      )}
    </section>
  );
}

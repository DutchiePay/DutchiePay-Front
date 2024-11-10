'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import OrderFilter from '@/app/_components/_mypage/_order/OrderFilter';
import OrderItem from '@/app/_components/_mypage/_order/OrderItem';
import arrow from '/public/image/arrow.svg';
import axios from 'axios';
import useRetryFunction from '@/app/hooks/useRetryFunction';
import { useSelector } from 'react-redux';

export default function MyOrder() {
  const [filter, setFilter] = useState('전체');
  const access = useSelector((state) => state.login.access);
  const nickname = useSelector((state) => state.login.user.nickname);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const isInitialMount = useRef(true);

  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/mygoods?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      setProduct((prevProducts) => [...prevProducts, ...response.data]);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        // 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
        reissueTokenAndRetry(() => fetchProduct());
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  }, [access, page, reissueTokenAndRetry]);

  useEffect(() => {
    // useEffect가 2번 호출되지 않도록 초기 렌더링 제한
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    fetchProduct();

    const handleMessage = (event) => {
      if (event.data.type === 'REFUND/EXCHANGE') {
        fetchProduct();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [access, page, fetchProduct]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // 구매내역 없을 때 UI도 구현해야 함
  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">구매내역</h1>
      <small>
        {nickname}님께서 구매하신 공동구매 상품을 확인할 수 있습니다.
      </small>
      <OrderFilter filter={filter} setFilter={setFilter} />
      {product.length === 0 ? (
        <></>
      ) : (
        <section className="flex flex-col gap-[24px]">
          {product.map((item, key) => (
            <OrderItem key={key} product={item} />
          ))}
          <button
            className="w-[250px] rounded flex justify-between items-center px-[24px] py-[8px] border mx-auto mt-[60px] mb-[40px]"
            onClick={handleLoadMore}
          >
            구매내역 더 불러오기
            <Image
              className="w-[20px] h-[20px]"
              src={arrow}
              alt="arrow"
              width={20}
              height={20}
            />
          </button>
        </section>
      )}
    </section>
  );
}

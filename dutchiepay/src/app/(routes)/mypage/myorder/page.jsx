'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import OrderFilter from '@/app/_components/_mypage/_order/OrderFilter';
import OrderItem from '@/app/_components/_mypage/_order/OrderItem';
import OrderListDefault from '@/app/_components/_mypage/_order/OrderListDefault';
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
  const [isEnd, setIsEnd] = useState(false);

  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  const fetchProduct = useCallback(
    async (filterParam) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/mygoods?page=${page}${
            filterParam ? `&filter=${filterParam}` : ''
          }&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        // 페이지가 1이면 데이터를 초기화하고, 아니면 추가
        setProduct((prevProducts) =>
          page === 1 ? response.data : [...prevProducts, ...response.data]
        );
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          // 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
          //reissueTokenAndRetry(() => fetchProduct(filterParam));
        } else if (
          error.response.data.message === '더 이상 주문 내역이 없습니다.'
        ) {
          alert('주문 내역을 모두 불러왔습니다.');
          setIsEnd(true);
        } else if (error.response.data.message === '주문 내역이 없습니다.') {
          setProduct([]);
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    },
    [access, page]
  );

  useEffect(() => {
    const getFilterValue = () => {
      switch (filter) {
        case '배송전':
          return 'pending';
        case '배송중':
          return 'shipped';
        case '배송완료':
          return 'delivered';
        default:
          return null;
      }
    };

    fetchProduct(getFilterValue());

    const handleMessage = (event) => {
      if (event.data.type === 'REFUND/EXCHANGE') {
        fetchProduct(getFilterValue());
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [page, fetchProduct, filter]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">구매내역</h1>
      <small>
        {nickname}님께서 구매하신 공동구매 상품을 확인할 수 있습니다.
      </small>
      <OrderFilter
        filter={filter}
        setFilter={setFilter}
        setPage={setPage}
        setIsEnd={setIsEnd}
      />
      {product.length === 0 ? (
        <OrderListDefault />
      ) : (
        <article className="flex flex-col gap-[24px]">
          {product.map((item, key) => (
            <OrderItem key={key} product={item} />
          ))}
          {!isEnd && (
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
          )}
        </article>
      )}
    </section>
  );
}

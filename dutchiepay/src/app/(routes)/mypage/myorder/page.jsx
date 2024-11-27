'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { ORDER_FILTER } from '@/app/_util/constants';
import OrderFilter from '@/app/_components/_mypage/_order/OrderFilter';
import OrderItem from '@/app/_components/_mypage/_order/OrderItem';
import OrderListDefault from '@/app/_components/_mypage/_order/OrderListDefault';
import arrow from '/public/image/arrow.svg';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function MyOrder() {
  const [filter, setFilter] = useState('전체');
  const access = useSelector((state) => state.login.access);
  const nickname = useSelector((state) => state.login.user.nickname);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);

  const fetchProduct = useCallback(
    async (filterParam) => {
      if (hasFetched.current) return;

      hasFetched.current = true;
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
          page === 1
            ? response.data.goods
            : [...prevProducts, ...response.data.goods]
        );
        setIsEnd(!response.data.hasNext);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          hasFetched.current = false;
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchProduct(filterParam); // 재발급된 액세스 토큰 사용
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
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
    [access, page, refreshAccessToken]
  );

  useEffect(() => {
    fetchProduct(ORDER_FILTER[filter]);
  }, [page, fetchProduct, filter]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'REFUND/EXCHANGE') {
        hasFetched.current = false;
        setPage(1);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleLoadMore = () => {
    hasFetched.current = false;
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
        <article className="flex flex-col gap-[24px] mb-[100px]">
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

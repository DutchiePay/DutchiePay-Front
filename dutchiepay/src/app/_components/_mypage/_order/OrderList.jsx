import '@/styles/globals.css';
import '@/styles/mypage.css';

import { useCallback, useEffect, useState } from 'react';

import LoadMore from './LoadMore';
import { ORDER_FILTER } from '@/app/_util/constants';
import OrderItem from '@/app/_components/_mypage/_order/OrderItem';
import OrderListDefault from '@/app/_components/_mypage/_order/OrderListDefault';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function OrderList({
  hasFetched,
  filter,
  isEnd,
  setIsEnd,
  page,
  setPage,
}) {
  const access = useSelector((state) => state.login.access);
  const [product, setProduct] = useState([]);

  const { refreshAccessToken } = useReissueToken();

  const fetchProduct = useCallback(async () => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/mygoods?page=${page}${
          ORDER_FILTER[filter] ? `&filter=${ORDER_FILTER[filter]}` : ''
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
          await fetchProduct();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
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
  }, [access, page, refreshAccessToken, setIsEnd, filter, hasFetched]);

  useEffect(() => {
    fetchProduct();
  }, [page, fetchProduct]);

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
  }, [setPage, hasFetched]);

  return (
    <>
      {product.length === 0 ? (
        <OrderListDefault />
      ) : (
        <article className="flex flex-col gap-[24px] mb-[100px]">
          {product.map((item, key) => (
            <OrderItem key={key} product={item} />
          ))}
          <LoadMore isEnd={isEnd} hasFetched={hasFetched} setPage={setPage} />
        </article>
      )}
    </>
  );
}

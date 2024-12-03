'use client';

import { useRef, useState } from 'react';

import OrderFilter from '@/app/_components/_mypage/_order/OrderFilter';
import OrderList from '@/app/_components/_mypage/_order/OrderList';
import { useSelector } from 'react-redux';

export default function MyOrder() {
  const [filter, setFilter] = useState('전체');
  const nickname = useSelector((state) => state.login.user.nickname);
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const hasFetched = useRef(false);

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
        hasFetched={hasFetched}
      />
      <OrderList
        filter={filter}
        isEnd={isEnd}
        setIsEnd={setIsEnd}
        page={page}
        setPage={setPage}
        hasFetched={hasFetched}
      />
    </section>
  );
}

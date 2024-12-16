'use client';

import CommunityPostList from '@/app/_components/_community/CommunityPostList';
import FreeCommunityFilter from '@/app/_components/_community/_free/FreeCommunityFilter';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Community() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const params = useSearchParams();

  const [filter, setFilter] = useState('최신순');
  const category = params.get('category');
  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-end items-end">
        <div className="flex items-end gap-[24px]">
          <FreeCommunityFilter filter={filter} setFilter={setFilter} />
          <Link
            href={`${isLoggedIn ? '/community/write' : '/login'}`}
            className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
            role="button"
          >
            게시글 작성
          </Link>
        </div>
      </div>

      <CommunityPostList
        filter={filter}
        setFilter={setFilter}
        category={category}
      />
    </section>
  );
}

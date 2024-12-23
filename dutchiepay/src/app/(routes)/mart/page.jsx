'use client';

import Link from 'next/link';
import MartPostList from '@/app/_components/_community/_local/MartPostList';
import PostSearch from '@/app/_components/_community/_common/PostSearch';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Mart() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const params = useSearchParams();
  const category = params.get('category');
  const [keyword, setKeyword] = useState('');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between">
        <PostSearch setKeyword={setKeyword} />
        <Link
          href={`${isLoggedIn ? '/mart/write' : '/login'}`}
          className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
          role="button"
        >
          게시글 작성
        </Link>
      </div>
      <MartPostList category={category} keyword={keyword} />
    </section>
  );
}

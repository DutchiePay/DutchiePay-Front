'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import Link from 'next/link';
import PostSearch from '@/app/_components/_community/_common/PostSearch';
import TradePostList from '@/app/_components/_community/_local/TradePostList';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Used() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params.get('category');
  const [keyword, setKeyword] = useState('');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between items-end">
        <PostSearch setKeyword={setKeyword} />
        <div className="flex items-end gap-[24px]">
          <Link
            href={`${isLoggedIn ? '/used/write' : `/login?redirect=${encodeURIComponent(pathname)}`}`}
            className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
            role="button"
          >
            게시글 작성
          </Link>
        </div>
      </div>

      <TradePostList category={category} keyword={keyword} />
    </section>
  );
}

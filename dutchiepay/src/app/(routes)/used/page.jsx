'use client';

import TradePostList from '@/app/_components/_community/_used/TradePostList';
import Post_Used from '@/app/_components/_community/Post_Used';
import Link from 'next/link';
import PostSearch from '@/app/_components/_community/_common/PostSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Used() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const params = useSearchParams();

  const category = params.get('category');
  const [keyword, setKeyword] = useState('');

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-between items-end">
        <PostSearch setKeyword={setKeyword} />
        <div className="flex items-end gap-[24px]">
          <Link
            href={`${isLoggedIn ? '/used/write' : '/login'}`}
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

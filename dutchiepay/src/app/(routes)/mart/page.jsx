'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import Link from 'next/link';
import MartPostList from '@/app/_components/_community/_local/MartPostList';
import { useSearchParams } from 'next/navigation';

export default function Mart() {
  const params = useSearchParams();
  const category = params.get('category');
  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="mt-[60px] flex justify-end">
        <Link
          href="/mart/write"
          className="text-white rounded bg-blue--500 px-[16px] py-[8px] text-sm"
          role="button"
        >
          게시글 작성
        </Link>
      </div>
      <MartPostList category={category} />
    </main>
  );
}

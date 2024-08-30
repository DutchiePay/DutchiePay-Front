'use client';

import Image from 'next/image';
import Link from 'next/link';
import Post from '@/app/_components/Post';
import Product_Like from '@/app/_components/Product_Like';
import arrow from '../../../../public/image/arrow.svg';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '검색어 없음';

  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <h2 className="mt-[40px] text-2xl font-bold">'{keyword}'에 대한 검색결과</h2>
      <section className="mt-[24px]">
        <div className="flex justify-between">
          <p>
            공동구매 <strong className="text-blue--500">1,300</strong>건
          </p>
          <Link href={`/search?keyword=${keyword}&section=commerce`} className="flex gap-[4px] items-center">
            <p className="text-gray--500">더보기</p>
            <Image src={arrow} alt="arrow" width={10} height={18} />
          </Link>
        </div>
        <div className="flex justify-between mt-[12px] px-[12px]">
          <Product_Like />
          <Product_Like />
          <Product_Like />
          <Product_Like />
        </div>
      </section>
      <section className="mt-[40px]">
        <div className="flex justify-between">
          <p>
            커뮤니티 <strong className="text-blue--500">200</strong>건
          </p>
          <Link href={`/search?keyword=${keyword}&section=community`} className="flex gap-[4px] items-center">
            <p className="text-gray--500">더보기</p>
            <Image src={arrow} alt="arrow" width={10} height={18} />
          </Link>
        </div>
        <div className="flex justify-between mt-[12px] px-[12px]">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </main>
  );
}

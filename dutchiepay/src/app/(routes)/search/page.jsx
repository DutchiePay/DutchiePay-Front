'use client';

import Image from 'next/image';
import Link from 'next/link';
import Post from '@/app/_components/_mypage/MyPostList';
import Product_Like from '@/app/_components/Product';
import arrow from '../../../../public/image/arrow.svg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '검색어 없음';
  const [hasCommunity, setHasCommunity] = useState(true); // 커뮤니티 결과 존재 여부 (추후 제거될 예정)
  const [hasCommerce, setHasCommerce] = useState(true); // 공동구매 결과 존재 여부 (추후 제거될 예정)

  return (
    <section className="min-h-[750px] w-[1020px] mb-[100px]">
      <h2 className="mt-[40px] text-2xl font-bold">
        &apos;{keyword}&apos;에 대한 검색결과
      </h2>
      {hasCommerce && (
        <section className="mt-[24px]">
          <div className="flex justify-between">
            <p>
              공동구매 <strong className="text-blue--500">1,300</strong>건
            </p>
            <Link
              href={`/search/commerce?keyword=${keyword}`}
              className="flex gap-[4px] items-center"
            >
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
      )}
      {hasCommunity && (
        <section className="mt-[40px]">
          <div className="flex justify-between">
            <p>
              커뮤니티 <strong className="text-blue--500">200</strong>건
            </p>
            <Link
              href={`/search/community?keyword=${keyword}`}
              className="flex gap-[4px] items-center"
            >
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
      )}
      {!hasCommerce && !hasCommunity && (
        <section className="h-[300px] mt-[40px] border rounded-lg px-[60px] flex flex-col justify-center">
          <p className="text-xl font-bold">
            <strong className="text-red--500">&apos;{keyword}&apos;</strong> 에
            대한 검색 결과가 없습니다.
          </p>
          <ul className="mt-[24px] text-gray--500">
            <li>단어의 철자가 정확한지 확인해 보세요.</li>
            <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
            <li>
              검색의 단어 수를 줄이거나, 보다 일반적인 검색으로 다시 검색해
              보세요.
            </li>
            <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
          </ul>
        </section>
      )}
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import NoPostMessage from '@/app/_util/getNoPostMessage';
import TradePostItem from './TradePostItem';
import post from '/public/image/community/post.svg';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';

export default function TradePostList({ category, keyword }) {
  const categoryParam = category ? `category=${category}&` : '';
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/trading/list?${categoryParam}limit=16&word=${keyword}`;
  const {
    items: posts,
    isInitialized,
    lastItemRef,
  } = useInfiniteScroll({ fetchUrl });
  return (
    <section
      className="mt-[16px] flex flex-wrap gap-[20px]"
      aria-label="게시글 목록"
    >
      {!isInitialized || posts.length === 0 ? (
        <div className="mx-auto my-auto  flex flex-col justify-center items-center">
          <Image
            src={post}
            alt="등록된 게시글이 없습니다."
            width={60}
            height={60}
            className="mt-[25%] pb-[30px] mx-auto"
          />
          <NoPostMessage keyword={keyword} />

          <Link
            href="/used/write"
            className="text-white rounded bg-blue--500 px-[40px] py-[14px] text-sm"
            role="button"
          >
            게시글 작성
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-8">
            {posts.map((item, key) => (
              <TradePostItem key={key} item={item} />
            ))}
            <div ref={lastItemRef}></div>
          </div>
        </>
      )}
    </section>
  );
}

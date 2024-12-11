import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import post from '/public/image/community/post.svg';

import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import MartPostItem from './_mart/MartPostItem';

export default function Post_Mart({ category }) {
  const categoryParam = category ? `category=${category}&` : '';
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/mart/list`;
  const {
    items: posts,
    isInitialized,
    lastItemRef,
  } = useInfiniteScroll(fetchUrl, categoryParam);

  return (
    <>
      {!isInitialized || posts.length === 0 ? (
        <div className="mx-auto my-auto  flex flex-col justify-center items-center">
          <Image
            src={post}
            alt="등록된 게시글이 없습니다."
            width={60}
            height={60}
            className="mt-[25%] pb-[30px] mx-auto"
          />
          <strong className="text-2xl text-center mb-[50px]">
            현재 등록된 게시글이 없습니다.
            <br />
            새로운 게시글을 작성하여 다양한 의견과 정보를 공유해 주세요.
          </strong>
          <Link
            href="/mart/write"
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
              <MartPostItem key={key} item={item} />
            ))}
            <div ref={lastItemRef}></div>
          </div>
        </>
      )}
    </>
  );
}

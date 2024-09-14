'use client';

import Image from 'next/image';
import PostContent from '@/app/_components/_community/PostContent';
import PostDetail from '@/app/_components/_community/PostDetail';
import { useSearchParams } from 'next/navigation';

export default function UsedDetail({ params }) {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  return (
    <section className="w-full flex min-h-[750px] w-[1020px]">
      <PostContent
        category={'거래'}
        menu={'거래/나눔'}
        isMyPostWritten={true}
      />
      <PostDetail menu={'거래/나눔'} isTrade={true} isMyPostWritten={true} />
    </section>
  );
}

'use client';

import Image from 'next/image';
import PostContent from '@/app/_components/_community/_common/PostContent';
import PostDetail from '@/app/_components/_community/PostDetail';
import { useSearchParams } from 'next/navigation';

export default function MartDetail() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  return (
    <section className="min-h-[750px] w-[1020px]">
      <div className="flex justify-between">
        <PostContent
          category={'배달'}
          menu={'마트/배달'}
          isMyPostWritten={true}
        />
        <PostDetail menu={'마트/배달'} isMyPostWritten={true} />
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import PostContent from '@/app/_components/_community/PostContent';
import PostDetail from '@/app/_components/_community/PostDetail';
import { useState } from 'react';

export default function MartDetail() {
  const [isMyPostWritten, setIsMyPostWritten] = useState(true); // 추후에는 memberId랑 writerId랑 비교하여 대체 될 예정

  return (
    <section className="min-h-[750px] w-[1020px] w-full flex">
      <PostContent
        category={'배달'}
        menu={'마트/배달'}
        isMyPostWritten={isMyPostWritten}
      />
      <PostDetail menu={'마트/배달'} isMyPostWritten={isMyPostWritten} />
    </section>
  );
}

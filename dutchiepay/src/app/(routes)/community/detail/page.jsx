'use client';

import Image from 'next/image';
import PostContent from '@/app/_components/_community/_post/PostContent';
import Post_Hot from '@/app/_components/_community/Post_Hot';
import Post_Similar from '@/app/_components/_community/Post_Similar';
import { useSearchParams } from 'next/navigation';

export default function CommunityDetail() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  return (
    <section className="min-h-[750px] w-[1020px]">
      <div className="flex justify-between">
        <PostContent
          category={'정보'}
          menu={'커뮤니티'}
          isMyPostWritten={true}
        />

        <section className="w-[290px] h-[750px] sticky top-[150px] pl-[24px] py-[40px] flex flex-col gap-[40px]">
          <article>
            <h2 className="text-2xl font-bold">유사한 게시글</h2>
            <div className="flex flex-col gap-[12px] mt-[8px]">
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
              <Post_Similar />
            </div>
          </article>
          <article>
            <h2 className="text-2xl font-bold">주간 HOT🔥 게시글</h2>
            <div className="flex flex-col gap-[12px] mt-[8px]">
              <Post_Hot index={1} />
              <Post_Hot index={2} />
              <Post_Hot index={3} />
              <Post_Hot index={4} />
              <Post_Hot index={5} />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

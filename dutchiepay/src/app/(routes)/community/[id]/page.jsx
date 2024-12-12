'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import PostContent from '@/app/_components/_community/_common/PostContent';
import Post_Hot from '@/app/_components/_community/_free/Post_Hot';
import Post_Similar from '@/app/_components/_community/_free/Post_Similar';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CommunityDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [post, setPost] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/free?freeId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          //
        } else if (
          error.response.data.message === '자유 게시글을 찾을 수 없습니다.'
        ) {
          alert('존재하지 않는 게시글 입니다.');
          router.push('/community');
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchCommunityDetail();
  }, [id, access, router]);

  return (
    <section className="min-h-[750px] w-[1020px]">
      <div className="flex justify-between">
        {post && <PostContent menu={'community'} post={post} postId={id} />}

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

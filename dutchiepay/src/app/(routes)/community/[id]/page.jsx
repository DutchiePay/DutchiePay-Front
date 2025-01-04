'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import PostContent from '@/app/_components/_community/_common/PostContent';
import PostRecommend from '@/app/_components/_community/_free/PostRecommend';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function CommunityDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [post, setPost] = useState(null);
  const router = useRouter();
  const hasFetched = useRef(false);
  const { refreshAccessToken } = useReissueToken();

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
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
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchCommunityDetail();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
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
  }, [id, access, router, refreshAccessToken]);

  return (
    <section className="min-h-[750px] w-[1020px]">
      {post && (
        <div className="flex justify-between">
          <PostContent menu={'community'} post={post} postId={Number(id)} />
          <PostRecommend post={post} />
        </div>
      )}
    </section>
  );
}

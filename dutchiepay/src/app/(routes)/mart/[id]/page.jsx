'use client';

import { useEffect, useRef, useState } from 'react';

import MartDetailInfo from '@/app/_components/_community/_local/MartDetailInfo';
import PostContent from '@/app/_components/_community/_common/PostContent';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import axios from 'axios';
import { useParams } from 'next/navigation';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function MartDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchMartDetail = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/mart?shareId=${id}`,
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
            await fetchMartDetail();
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
          router.push('/mart');
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchMartDetail();
  }, [id, access, router, refreshAccessToken]);
  return (
    <ProtectedRoute>
      <section className="min-h-[750px] w-[1020px]">
        <div className="flex justify-between">
          {post && (
            <>
              <PostContent menu={'mart'} post={post} postId={Number(id)} />
              <MartDetailInfo post={post} postId={id} />
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}

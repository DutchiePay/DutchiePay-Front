'use client';

import { useEffect, useRef, useState } from 'react';

import PostContent from '@/app/_components/_community/_common/PostContent';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import TradeDetailInfo from '@/app/_components/_community/_local/TradeDetailInfo';
import axios from 'axios';
import { useParams } from 'next/navigation';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function TradeDetail() {
  const { id } = useParams();
  const access = useSelector((state) => state.login.access);
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTradeDetail = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/trading?purchaseId=${id}`,
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
            await fetchTradeDetail();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchTradeDetail();
  }, [id, access, router, refreshAccessToken]);

  return (
    <ProtectedRoute>
      <section className="min-h-[750px] w-[1020px]">
        <div className="flex justify-between">
          {post && (
            <>
              <PostContent menu={'used'} post={post} postId={id} />
              <TradeDetailInfo post={post} postId={id} />
            </>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}

'use client';

import Link from 'next/link';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function PostDetailAction({ postId, writerId, menu }) {
  const userId = useSelector((state) => state.login.user.userId);
  const access = useSelector((state) => state.login.access);
  const router = useRouter();
  const { refreshAccessToken } = useReissueToken();

  const handlePostDelete = async () => {
    if (
      confirm('정말 삭제하시겠습니까?\n삭제된 게시글은 복구가 불가능합니다.')
    ) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${menu === 'mart' ? 'mart?shareId' : menu === 'community' ? 'free?freeId' : 'trading?purchaseId'}=${postId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        alert('정상적으로 삭제되었습니다.');
        router.push(`/${menu}`);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await handlePostDelete();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다 다시 시도해주세요.'
            );
          }
        } else if (
          error.response.data.message === '작성자가 일치하지 않습니다.'
        ) {
          alert('게시글 권한이 없습니다.');
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <>
      {writerId === userId && (
        <div className="flex gap-[16px]">
          <Link
            className="text-sm text-gray--500 hover:underline"
            href={`/${menu}/write/${postId}`}
            role="button"
          >
            수정하기
          </Link>
          <button
            className="text-sm text-gray--500 hover:underline"
            onClick={handlePostDelete}
          >
            삭제하기
          </button>
        </div>
      )}
    </>
  );
}

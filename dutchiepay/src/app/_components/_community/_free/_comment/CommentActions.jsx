'use client';

import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function CommentActions({
  commentId,
  writerName,
  setIsEdit,
  refreshComments,
}) {
  const userNickname = useSelector((state) => state.login.user.nickname);
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();

  const handlePostDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?\n삭제된 댓글은 복구가 불가능합니다.')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments?commentId=${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        alert('정상적으로 삭제되었습니다.');
        refreshComments();
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
          error.response.data.message === '원 댓글을 찾을 수 없습니다.'
        ) {
          alert('원 댓글을 찾을 수 없습니다.');
        } else if (
          error.response.data.message === '작성자가 일치하지 않습니다.'
        ) {
          alert('작성자가 일치하지 않습니다.');
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <>
      {writerName === userNickname && (
        <div className="flex gap-[16px]">
          <button className="font-bold text-xs" onClick={() => setIsEdit(true)}>
            수정
          </button>
          <button className="font-bold text-xs" onClick={handlePostDelete}>
            삭제
          </button>
        </div>
      )}
    </>
  );
}

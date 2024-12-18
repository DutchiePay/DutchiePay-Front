import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import ReplyList from '@/app/_components/_community/_free/ReplyList';
import reply from '/public/image/community/reply.svg';
import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';
import profile from '/public/image/profile.jpg';
import ReplyForm from './ReplyForm';
import RootCommentInfo from './RootCommentInfo';

export default function FreeCommentList({
  item,
  postId,
  isInitialized,
  refreshComments,
}) {
  const access = useSelector((state) => state.login.access);
  const profileImg = useSelector((state) => state.login.profileImage);

  const [isReplyActive, setIsReplyActive] = useState(false);
  const hasFetched = useRef(false);
  const { refreshAccessToken } = useReissueToken();
  const [replys, setReplys] = useState([]);
  const [type, setType] = useState('first');
  const commentId = item.commentId || '';

  const fetchReplies = useCallback(
    async (typeParam) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments?commentId=${commentId}&type=${typeParam}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setReplys((prevReplies) => {
          return typeParam === 'rest'
            ? [...prevReplies, ...response.data]
            : response.data;
        });
      } catch (error) {
        if (error.response?.data?.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchReplies(typeParam);
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
    },
    [access, commentId, refreshAccessToken]
  );

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchReplies(type);
    }
  }, [fetchReplies, type]);

  const handleLoadMore = () => {
    setType('rest');
    fetchReplies('rest');
  };

  return (
    <div className="flex items-start">
      <Image
        className="border rounded-full"
        src={item.profileImg || profile}
        alt="profile"
        width={50}
        height={50}
      />
      <div className="w-full">
        {postId && (
          <RootCommentInfo
            item={item}
            isInitialized={isInitialized}
            refreshComments={refreshComments}
            setIsReplyActive={setIsReplyActive}
            isReplyActive={isReplyActive}
          />
        )}

        <div className="mt-[8px] flex flex-col gap-[4px]">
          {replys &&
            replys.map((replyItem, key) => (
              <ReplyList
                item={replyItem}
                key={key}
                postId={postId}
                refreshComments={refreshComments}
              />
            ))}
          {item.hasMore && type != 'rest' && (
            <button
              onClick={handleLoadMore}
              className="text-sm mb-[5px] text-blue--500"
            >
              답글 더보기
            </button>
          )}
        </div>
        {isReplyActive && (
          <div className="flex gap-[8px] items-start">
            <Image src={reply} alt="reply" width={20} height={20} />
            <Image
              className="w-[50px] h-[50px] border rounded-full"
              src={profileImg || profile}
              alt="profile"
              width={50}
              height={50}
            />
            {/* 원본 댓글에 대한 답글 폼 */}
            <div className="w-[500px] ml-1 border border-gray--300 rounded-lg p-3 text-sm">
              <ReplyForm
                mentionedNickname={item.nickname}
                mentionedId={item.commentId}
                postId={postId}
                rootCommentId={item.commentId}
                refreshComments={refreshComments}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

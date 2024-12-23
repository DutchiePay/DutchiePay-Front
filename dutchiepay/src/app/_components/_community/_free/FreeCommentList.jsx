import { useCallback, useRef, useState } from 'react';

import Image from 'next/image';
import ReplyForm from './ReplyForm';
import ReplyList from '@/app/_components/_community/_free/ReplyList';
import RootCommentInfo from './RootCommentInfo';
import axios from 'axios';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import trash from '/public/image/trash.svg';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

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
  const [type, setType] = useState('');
  const commentId = item.commentId || '';
  const [hasViewedReplies, setHasViewedReplies] = useState(false);

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
        setType(typeParam);
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

  return (
    <div className="flex items-start mb-[20px] gap-[4px]">
      <Image
        className="border rounded-full"
        src={
          item.nickname === null && item.contents === '삭제된 댓글입니다.'
            ? trash
            : item.profileImg || profile
        }
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
        )}{' '}
        <div className="mt-[10px] flex flex-col gap-[4px]">
          {item.reCommentCount > 0 && !hasViewedReplies && (
            <button
              onClick={() => {
                fetchReplies('first');
                hasFetched.current = true;
                setHasViewedReplies(true);
              }}
              className="text-sm mb-[5px] text-blue--500 hover:underline"
            >
              답글 보기
            </button>
          )}
          {replys &&
            replys.map((replyItem, key) => (
              <ReplyList
                item={replyItem}
                key={key}
                postId={postId}
                rootCommentId={item.commentId}
                refreshComments={refreshComments}
              />
            ))}
          {item.reCommentCount > 5 && type === 'first' && (
            <button
              onClick={() => {
                fetchReplies('rest');
                hasFetched.current = true;
              }}
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

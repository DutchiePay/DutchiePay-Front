import { useCallback, useRef, useState } from 'react';

import DeleteComment from './DeleteComment';
import Image from 'next/image';
import MoreComment from './MoreComment';
import ReplyInput from './ReplyInput';
import RootCommentInfo from './RootCommentInfo';
import axios from 'axios';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function FreeCommentList({
  item,
  postId,
  isInitialized,
  refreshComments,
}) {
  const access = useSelector((state) => state.login.access);
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

  const handleMore = (type) => {
    fetchReplies(type);
    hasFetched.current = true;
    if (type === 'first') setHasViewedReplies(true);
  };

  return (
    <div className="flex flex-col mb-[20px] gap-[4px]">
      {item.nickname === null && item.contents === '삭제된 댓글입니다.' ? (
        <DeleteComment />
      ) : (
        <div className="flex mb-[8px]">
          <div className="relative w-[50px] h-[50px] border rounded-full">
            <Image
              className="rounded-full object-cover"
              src={item.profileImg || profile}
              alt="profile"
              fill
            />
          </div>
          <div className="grow">
            {postId && (
              <RootCommentInfo
                item={item}
                isInitialized={isInitialized}
                refreshComments={refreshComments}
                setIsReplyActive={setIsReplyActive}
                isReplyActive={isReplyActive}
              />
            )}{' '}
            {isReplyActive && (
              <div className="mt-[8px] flex gap-[8px] items-start">
                <Image src={reply} alt="reply" width={20} height={20} />
                <ReplyInput
                  mentionedNickname={item.nickname}
                  mentionedId={item.commentId}
                  postId={postId}
                  rootCommentId={item.commentId}
                  refreshComments={refreshComments}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <MoreComment
        item={item}
        handleMore={handleMore}
        hasViewedReplies={hasViewedReplies}
        type={type}
        replys={replys}
        refreshComments={refreshComments}
        postId={postId}
      />
    </div>
  );
}

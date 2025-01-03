'use client';

import CommentSubmit from './CommentSubmit';
import FreeCommentList from './FreeCommentList';
import Image from 'next/image';
import communityComment from '/public/image/community/communityComment.svg';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';

export default function CommentForm({ postId, post }) {
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments/list?freeId=${postId}&limit=6`;
  const {
    items: comments,
    isInitialized,
    lastItemRef,
    refresh: refreshComments,
  } = useInfiniteScroll({ fetchUrl });

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[12px]">
        <h2 className="text-xl font-bold">댓글</h2>
        <p>{post.commentsCount}개</p>
      </div>
      <CommentSubmit postId={postId} refreshComments={refreshComments} />
      {!isInitialized || comments.length === 0 ? (
        <div className="mx-auto my-auto  flex flex-col justify-center items-center">
          <Image
            src={communityComment}
            alt="등록된 댓글이 없습니다."
            width={58}
            height={58}
            className="mt-[60px] mb-[12px] mx-auto"
          />
          <p className="text-sm text-center mb-[50px] text-gray--500">
            현재 등록된 댓글이 없습니다.
            <br />
            새로운 댓글을 작성하여 다양한 의견과 정보를 공유해 주세요.
          </p>
        </div>
      ) : (
        <div className="mt-[24px] border-t py-[16px]">
          {comments.map((item, index) => (
            <FreeCommentList
              key={index}
              item={item}
              postId={postId}
              isInitialized={isInitialized}
              refreshComments={refreshComments}
            />
          ))}
          <div ref={lastItemRef}></div>
        </div>
      )}
    </div>
  );
}

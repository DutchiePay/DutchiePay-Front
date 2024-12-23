'use client';

import '@/styles/globals.css';

import CommentWrite from './CommentWrite';
import FreeCommentList from './FreeCommentList';
import Image from 'next/image';
import communityComment from '/public/image/community/communityComment.svg';
import profile from '/public/image/profile.jpg';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import { useSelector } from 'react-redux';

const CommentForm = ({ postId, post }) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments/list?freeId=${postId}&limit=6`;
  const {
    items: comments,
    isInitialized,
    lastItemRef,
    refresh: refreshComments,
  } = useInfiniteScroll({ fetchUrl });
  const profileImage = useSelector((state) => state.login.user.profileImage);

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[12px]">
        <h2 className="text-xl font-bold">댓글</h2>
        <p>{post.commentsCount}개</p>
      </div>
      <div className="flex justify-between my-[12px]">
        <div className="relative w-[50px] h-[50px] rounded-full border">
          <Image
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={profileImage || profile}
            alt="프로필"
            fill
          />
        </div>
        <CommentWrite
          postId={postId}
          refreshComments={refreshComments}
          type={'comment'}
        />
      </div>
      {!isInitialized || comments.length === 0 ? (
        <div className="mx-auto my-auto  flex flex-col justify-center items-center">
          <Image
            src={communityComment}
            alt="등록된 댓글이 없습니다."
            width={58}
            height={58}
            className="mt-[60px] mb-[12px] mx-auto"
          />
          <p className="text-sm text-center mb-[50px]">
            현재 등록된 댓글이 없습니다.
            <br />
            새로운 댓글을 작성하여 다양한 의견과 정보를 공유해 주세요.
          </p>
        </div>
      ) : (
        <div className="border-b py-[16px]">
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
};

export default CommentForm;

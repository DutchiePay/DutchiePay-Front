'use client';

import '@/styles/globals.css';

import Image from 'next/image';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';

import FreeCommentList from './FreeCommentList';
import CommentWrite from './CommentWrite';
import communityComment from '/public/image/community/communityComment.svg';

const CommentForm = ({
  postId,
  post,
  isInitialized,
  comments,
  refreshComments,
  lastItemRef,
}) => {
  const profileImage = useSelector((state) => state.login.user.profileImage);

  return (
    <div className="mt-[40px]">
      <div className="flex items-center gap-[12px]">
        <h2 className="text-xl font-bold">댓글</h2>
        <p>{post.commentsCount}개</p>
      </div>
      <div className="flex gap-[12px] my-[12px]">
        <Image
          className="w-[50px] h-[50px] rounded-full border"
          src={profileImage || profile}
          alt="프로필"
          width={50}
          height={50}
        />
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
            width={60}
            height={60}
            className="mt-[15%] pb-[30px] mx-auto"
          />
          <strong className="text-l text-center mb-[50px]">
            현재 등록된 댓글이 없습니다.
            <br />
            새로운 댓글을 작성하여 다양한 의견과 정보를 공유해 주세요.
          </strong>
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

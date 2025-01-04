import CommentInfo from './CommentInfo';
import Image from 'next/image';
import ReplyEditForm from './ReplyEditForm';
import ReplyInput from './ReplyInput';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import { useState } from 'react';

export default function ReplyList({
  item,
  refreshComments,
  postId,
  rootCommentId,
}) {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="w-[590px] py-[16px]">
      <div className="flex items-start">
        <Image
          className="mt-[8px]"
          src={reply}
          alt="reply"
          width={20}
          height={20}
        />
        <div className="ml-[8px] relative w-[50px] h-[50px] border rounded-full">
          <Image
            className="rounded-full object-cover"
            src={item.profileImg || profile}
            alt="profile"
            fill
          />
        </div>
        <div className="w-[515px]">
          <CommentInfo
            item={item}
            refreshComments={refreshComments}
            setIsEdit={setIsEdit}
            setIsReplyActive={setIsReplyActive}
            isReplyActive={isReplyActive}
          />
          {isEdit ? (
            <ReplyEditForm
              commentId={item.commentId}
              item={item}
              setIsEdit={setIsEdit}
              mentionedNickname={item.mentionedNickname}
              refreshComments={refreshComments}
              reply={true}
            />
          ) : (
            <p className="ml-3">
              <span className="text-blue--500 font-bold text-sm">
                @
                {item.mentionedUserState === '회원'
                  ? item.mentionedNickname
                  : '탈퇴한 사용자'}
              </span>
              <span className="text-sm px-[12px]">{item.contents}</span>
            </p>
          )}
        </div>
      </div>
      {isReplyActive && (
        <div className="mt-[30px] flex gap-[8px] items-start">
          <Image
            className="mt-[8px]"
            src={reply}
            alt="reply"
            width={20}
            height={20}
          />
          <ReplyInput
            mentionedNickname={item.mentionedNickname}
            mentionedId={item.commentId}
            postId={postId}
            rootCommentId={rootCommentId}
            refreshComments={refreshComments}
            setIsReplyActive={setIsReplyActive}
          />
        </div>
      )}
    </div>
  );
}

import '@/styles/globals.css';

import FreeDetailAction from '../FreeDetailAction';
import Image from 'next/image';
import ReplyEditForm from './ReplyEditForm';
import ReplyForm from './ReplyInput'; // 새로운 컴포넌트 import
import axios from 'axios';
import { getFormatDate } from '@/app/_util/getFormatDate';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function ReplyList({
  item,
  refreshComments,
  postId,
  rootCommentId,
}) {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isMine =
    item.nickname === useSelector((state) => state.login.user.nickname)
      ? true
      : false;
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
          <div className="px-[12px] py-[4px] flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <strong className="text-sm">
                {item.userState === '회원' ? item.nickname : '탈퇴한 사용자'}
              </strong>
              <p className="text-xs text-gray--500">
                {getFormatDate('comment', item.createdAt)}
                {item.isModified && ' (수정됨)'}
              </p>
            </div>
            {!isMine && item.userState === '회원' ? (
              <button
                className="font-bold text-xs"
                onClick={() => setIsReplyActive(!isReplyActive)}
              >
                답글
              </button>
            ) : (
              <FreeDetailAction
                writerName={item.nickname}
                commentId={item.commentId}
                setIsEdit={setIsEdit}
                setIsDeleted={setIsDeleted}
                refreshComments={refreshComments}
              />
            )}
          </div>
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
            <>
              <span className="text-blue--500 font-bold text-sm ml-3">
                @
                {item.mentionedUserState === '회원'
                  ? item.mentionedNickname
                  : '탈퇴한 사용자'}
              </span>
              <span className="text-sm px-[12px]">{item.contents}</span>
            </>
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
          <ReplyForm
            mentionedNickname={item.mentionedNickname}
            mentionedId={item.mentionedId}
            postId={postId}
            rootCommentId={rootCommentId}
            refreshComments={refreshComments}
            is
          />
        </div>
      )}
    </div>
  );
}

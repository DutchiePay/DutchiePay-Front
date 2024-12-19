import '@/styles/globals.css';
import Image from 'next/image';
import ReplyForm from './ReplyForm'; // 새로운 컴포넌트 import
import axios from 'axios';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getFormatDate } from '@/app/_util/getFormatDate';
import FreeDetailAction from './FreeDetailAction';
import ReplyEditForm from './ReplyEditForm';

export default function ReplyList({ item, refreshComments, postId }) {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isMine =
    item.nickname === useSelector((state) => state.login.user.nickname)
      ? true
      : false;
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="py-[16px]">
      <div className="flex items-start">
        <Image
          className="mt-[8px]"
          src={reply}
          alt="reply"
          width={20}
          height={20}
        />
        <Image
          className="border rounded-full ml-[8px]"
          src={item.profileImg || profile}
          alt="profile"
          width={50}
          height={50}
        />
        <div className="w-full">
          <div className="w-full px-[12px] py-[4px] flex justify-between items-center">
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
            <div className="w-[500px] ml-3 border border-gray--300 rounded-lg p-3 text-sm">
              <ReplyEditForm
                commentId={item.commentId}
                item={item}
                setIsEdit={setIsEdit}
                mentionedNickname={item.mentionedNickname}
                refreshComments={refreshComments}
                reply={true}
              />
            </div>
          ) : (
            <>
              <span className="text-blue--500 font-bold text-xs ml-3 bg-gray--100 p-1">
                @
                {item.mentionedUserState === '회원'
                  ? item.mentionedNickname
                  : '탈퇴한 사용자'}
              </span>
              <span className="text-sm px-[12px]">{item.content}</span>
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
          <Image
            className="w-[50px] h-[50px] border rounded-full"
            src={profile}
            alt="profile"
            width={50}
            height={50}
          />
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
  );
}

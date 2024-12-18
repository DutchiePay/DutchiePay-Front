import { useState } from 'react';
import FreeDetailAction from './FreeDetailAction';
import ReplyEditForm from './ReplyEditForm';
import trash from '/public/image/trash.svg';
import { getFormatDate } from '@/app/_util/getFormatDate';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function RootCommentInfo({
  item,
  isInitialized,
  refreshComments,
  setIsReplyActive,
  isReplyActive,
}) {
  const [isDeleted, setIsDeleted] = useState(false);

  const isMine =
    item.nickname === useSelector((state) => state.login.user.nickname)
      ? true
      : false;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      {isDeleted &&
      item.nickname === null &&
      item.contents == '삭제된 댓글입니다.' ? (
        <div className="flex gap-[12px] my-[12px]">
          <Image
            className="w-[50px] h-[50px] rounded-full border"
            src={trash}
            alt="프로필"
            width={50}
            height={50}
          />
          <div className="h-[45px] ml-[12px] font-bold flex items-center">
            삭제된 댓글입니다.
          </div>
        </div>
      ) : (
        isInitialized && (
          <>
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
              <div className="w-[589px] ml-3 border border-gray--300 rounded-lg p-3 text-sm">
                <ReplyEditForm
                  commentId={item.commentId}
                  item={item}
                  setIsEdit={setIsEdit}
                  refreshComments={refreshComments}
                />
              </div>
            ) : (
              <span className="text-sm px-[12px]">{item.contents}</span>
            )}
          </>
        )
      )}
    </>
  );
}

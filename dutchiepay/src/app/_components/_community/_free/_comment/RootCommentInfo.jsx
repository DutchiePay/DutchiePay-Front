import CommentInfo from './CommentInfo';
import ReplyEditForm from './ReplyEditForm';
import { useState } from 'react';

export default function RootCommentInfo({
  item,
  refreshComments,
  setIsReplyActive,
  isReplyActive,
}) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
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
          refreshComments={refreshComments}
        />
      ) : (
        <p className="text-sm ml-[12px] leading-relaxed">{item.contents}</p>
      )}
    </>
  );
}

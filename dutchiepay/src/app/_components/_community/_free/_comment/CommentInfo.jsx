import CommentActions from './CommentActions';
import { getFormatDate } from '@/app/_util/getFormatDate';
import { useSelector } from 'react-redux';

export default function CommentInfo({
  item,
  refreshComments,
  setIsEdit,
  setIsReplyActive,
  isReplyActive,
}) {
  const isMine =
    item.nickname === useSelector((state) => state.login.user.nickname)
      ? true
      : false;

  return (
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
      <div className="flex gap-[16px]">
        {item.userState === '회원' && (
          <button
            className="font-bold text-xs"
            onClick={() => setIsReplyActive(!isReplyActive)}
          >
            답글
          </button>
        )}
        {isMine && (
          <CommentActions
            writerName={item.nickname}
            commentId={item.commentId}
            setIsEdit={setIsEdit}
            refreshComments={refreshComments}
          />
        )}
      </div>
    </div>
  );
}

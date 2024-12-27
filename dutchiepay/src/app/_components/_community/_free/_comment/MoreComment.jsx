import Image from 'next/image';
import ReplyList from '@/app/_components/_community/_free/_comment/ReplyList';
import more from '/public/image/more.svg';

export default function MoreComment({
  item,
  postId,
  refreshComments,
  handleMore,
  hasViewedReplies,
  type,
  replys,
}) {
  return (
    <div className="w-full flex flex-col items-start gap-[4px] ml-[60px]">
      {item.reCommentCount > 0 && !hasViewedReplies && (
        <button
          onClick={() => handleMore('first')}
          className="flex items-center gap-[8px] text-sm mb-[5px] text-blue--500 font-semibold hover:underline"
        >
          <Image src={more} alt="more" width={14} height={20} />
          답글 보기
        </button>
      )}
      {replys &&
        replys.map((replyItem, key) => (
          <ReplyList
            item={replyItem}
            key={key}
            postId={postId}
            rootCommentId={item.commentId}
            refreshComments={refreshComments}
          />
        ))}
      {item.reCommentCount > 5 && type === 'first' && (
        <button
          onClick={() => handleMore('rest')}
          className="flex items-center gap-[8px] font-bold text-sm mb-[5px] text-blue--500"
        >
          <Image src={more} alt="more" width={14} height={20} />
          답글 더보기
        </button>
      )}
    </div>
  );
}

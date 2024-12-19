import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import FreeCommentList from './FreeCommentList';

export default function Comment({ id }) {
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments/list`;
  const postId = id;
  const {
    items: comments,
    isInitialized,
    lastItemRef,
  } = useInfiniteScroll(fetchUrl, null, null, null, postId);

  return (
    <>
      {!isInitialized || comments.length === 0 ? (
        <div>test</div>
      ) : (
        <div className="border-b py-[16px]">
          {comments.map((item, index) => (
            <FreeCommentList key={index} item={item} postId={id} />
          ))}
          <div ref={lastItemRef}></div>
        </div>
      )}
    </>
  );
}

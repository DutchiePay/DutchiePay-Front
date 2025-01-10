import Link from 'next/link';

const ReviewActions = ({ item, onDelete }) => {
  const openPopup = (url) => {
    window.open(url, '_blank', 'width=620, height=670');
  };
  return (
    <div className="flex justify-between items-center">
      <Link
        href={`/commerce/${item.buyId}`}
        className="inline-block max-w-[470px] line-clamp-1 font-bold"
      >
        {item.productName}
      </Link>
      <div className="flex gap-[12px]">
        {item.isPossible && (
          <button
            className="text-sm font-semibold"
            onClick={() =>
              openPopup(
                `/review?reviewId=${item.reviewId}&buyId=${item.buyId}&orderNum=${item.orderNum}`
              )
            }
          >
            수정
          </button>
        )}
        <button className="text-sm font-semibold" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default ReviewActions;

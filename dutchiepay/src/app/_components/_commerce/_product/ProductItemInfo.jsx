export default function ProductItemInfo({ item }) {
  return (
    <>
      <p className="min-h-[48px] mt-[8px] line-clamp-2 font-medium">
        {item.productName}
      </p>
      <div className="mt-[4px] flex gap-[8px] items-center">
        {item.discountPercent > 0 && (
          <>
            <p className="text-red--500 font-semibold">
              {item.discountPercent}%
            </p>
            <p className="text-xs text-gray--500 line-through">
              {item.productPrice.toLocaleString('ko-KR')}원
            </p>
          </>
        )}
        <strong>{item.discountPrice.toLocaleString('ko-KR')}원</strong>
      </div>
    </>
  );
}

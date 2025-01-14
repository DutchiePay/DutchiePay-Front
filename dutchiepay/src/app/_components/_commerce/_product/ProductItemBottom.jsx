export default function ProductItemBottom({ item }) {
  return (
    <>
      <div className="mt-[8px] flex justify-between items-baseline">
        <span
          className={`${item.expireDate < 0 ? '' : 'text-blue--500'} text-lg font-semibold flex gap-[4px] items-baseline`}
        >
          {Math.round((item.nowCount / item.skeleton) * 100)}%
          <p className="text-sm font-medium">달성</p>
        </span>
        <p
          className={`${item.expireDate === 0 ? 'text-red--500' : 'text-gray--500'} text-xs font-medium`}
        >
          {item.expireDate < 0
            ? '공구마감'
            : item.expireDate === 0
              ? '오늘 마감'
              : `${item.expireDate}일 남음`}
        </p>
      </div>
      <progress
        id="product-list-progress"
        className={`product-list-progress w-full h-[3px] ${item.expireDate < 0 ? 'product-list-progress__end' : ''}`}
        value={Math.round((item.nowCount / item.skeleton) * 100)}
        min={0}
        max={100}
      />
    </>
  );
}

'use client';

export default function ProductStatus({ product }) {
  return (
    <ul className="flex mt-[8px] mb-[30px] justify-between">
      <li className="grow text-sm pr-[8px] relative product-summary__item">
        <p className="text-gray--500">공구 업체</p>
        <p>{product?.storeName}</p>
      </li>
      <li className="grow text-sm px-[8px] relative product-summary__item">
        <p className="text-gray--500">목표 수량</p>
        <p>{product?.skeleton}개</p>
      </li>
      <li className="grow text-sm px-[8px] relative product-summary__item">
        <p className="text-gray--500">판매된 수량</p>
        <p>{product?.nowCount}개</p>
        <p className="font-medium">
          ({Math.round((product?.nowCount / product?.skeleton) * 100)}%)
        </p>
      </li>
      <li className="grow text-sm px-[8px] relative product-summary__item">
        <p className="text-gray--500">좋아요 수</p>
        <p>{product?.likeCount}개</p>
      </li>
      <li className="grow text-sm px-[8px] relative product-summary__item">
        <p className="text-gray--500">후기 수</p>
        <p>{product?.reviewCount}개</p>
      </li>
    </ul>
  );
}

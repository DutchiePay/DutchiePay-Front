'use client';

import ProductLike from '../ProductLike';

export default function DeliveryAndLikeInfo({ deadline, isLiked, productId }) {
  const deliveryDate = new Date(deadline);
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  return (
    <div className="mt-[8px] mb-[30px] flex justify-between items-center">
      <div className="flex flex-col gap-[4px]">
        <p className="text-xs">
          배송 : <strong>무료배송 (CJ대한통운)</strong>
        </p>
        <p className="text-xs">
          배송 출발 예정 :{' '}
          <strong>{`${deliveryDate.getMonth() + 1}월 ${deliveryDate.getDate()}일`}</strong>{' '}
          이후 순차배송
        </p>
      </div>
      <button className="w-[45px] h-[45px] border flex justify-center items-center">
        <ProductLike productId={productId} isLiked={isLiked} size={33} />
      </button>
    </div>
  );
}

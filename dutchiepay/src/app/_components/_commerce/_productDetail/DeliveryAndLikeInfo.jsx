'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import fullHeart from '/public/image/fullheart.svg';
import heart from '/public/image/emptyHeart.svg';

export default function DeliveryAndLikeInfo({ deadline, isLiked }) {
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
        {isLiked ? (
          <Image src={fullHeart} alt="좋아요" width={30} height={30} />
        ) : (
          <Image src={heart} alt="좋아요" width={30} height={30} />
        )}
      </button>
    </div>
  );
}

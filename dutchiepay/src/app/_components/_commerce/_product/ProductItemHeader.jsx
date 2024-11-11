'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import ProductLike from '../ProductLike';
import Rating from '../../_rating/Rating';

export default function ProductItemHeader({ item }) {
  return (
    <>
      <div className="w-full h-[240px] relative overflow-hidden object-cover">
        <Image
          className={`w-full h-[240px] transform transition-transform duration-300 hover:scale-110`}
          src={item.productImg}
          alt={item.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between items-center py-[6px] border-b">
        <div className="flex gap-[8px] items-center">
          <Rating rating={item.rating} size={15} />
          <p className="text-xs text-gray--500">
            ({item.reviewCount > 999 ? '999+' : item.reviewCount})
          </p>
        </div>
        <ProductLike isLiked={item.isLiked} productId={item.buyId} size={22} />
      </div>
    </>
  );
}

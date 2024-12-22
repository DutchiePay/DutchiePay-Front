import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import ProductLike from './_commerce/ProductLike';
import Rating from './_rating/Rating';

export default function Product({ product }) {
  return (
    <>
      {product && (
        <Link
          href={`/commerce/${product.buyId}`}
          className="w-[220px] flex flex-col gap-[4px]"
        >
          <div className="w-full h-[148px] relative overflow-hidden z-10">
            <Image
              className={`w-full h-[148px] transform transition-transform duration-300 hover:scale-110 object-cover ${product.expireDate < 0 ? 'grayscale-[65%]' : ''}`}
              src={product.productImg}
              alt={product.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex justify-between items-center py-[6px] border-b">
            <div className="flex gap-[8px] items-center">
              <Rating rating={product.rating} size={15} />
              <p className="text-[12px] text-gray--500">
                ({product.reviewCount > 999 ? '999+' : product.reviewCount})
              </p>
            </div>
            {<ProductLike isLiked={true} productId={product.buyId} size={22} />}
          </div>
          <p className="mt-[4px] title--multi-line font-medium min-h-[48px]">
            {product.productName}
          </p>
          <div className="flex gap-[8px] items-center">
            <p className="text-red--500 font-semibold">
              {product.discountPercent}%
            </p>
            <p className="text-[12px] text-gray--500 line-through">
              {product.originalPrice?.toLocaleString('ko-KR')}원
            </p>
            <strong className="text-[16px]">
              {product.salePrice?.toLocaleString('ko-KR')}원
            </strong>
          </div>

          <div className="mt-[4px] flex justify-between items-baseline">
            <span
              className={`${product.expireDate < 0 ? '' : 'text-blue--500'} text-lg font-semibold flex items-baseline gap-[4px]`}
            >
              {Math.round((product.nowCount / product.skeleton) * 100)}%
              <p className="text-sm font-medium">달성</p>
            </span>
            <p
              className={`${product.expireDate === 0 ? 'text-red--500' : 'text-gray--500'} text-xs font-semibold`}
            >
              {product.expireDate < 0
                ? '공구마감'
                : product.expireDate === 0
                  ? '오늘 마감'
                  : `${product.expireDate}일 남음`}
            </p>
          </div>
          <progress
            id="product-list-progress"
            className={`product-list-progress w-full h-[3px] ${product.expireDate < 0 ? 'product-list-progress__end' : ''}`}
            value={Math.round((product.nowCount / product.skeleton) * 100)}
            min={0}
            max={100}
          />
        </Link>
      )}
    </>
  );
}

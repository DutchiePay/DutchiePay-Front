import '@/styles/globals.css';
import '@/styles/commerce.css';

import getCategoryNames from '@/app/_util/getCategoryNames';

export default function ProductTitle({ product }) {
  return (
    <>
      <p className="text-sm text-blue--500 font-semibold">
        {getCategoryNames(product?.category)}
      </p>
      <h1 className="font-bold text-xl">{product?.productName}</h1>
      <div className="flex my-[4px] items-center gap-[8px]">
        {product?.discountPercent !== 0 && (
          <p className="line-through text-sm text-gray--500">
            {product?.originalPrice.toLocaleString('ko-KR')}원
          </p>
        )}
        <p className="font-bold text-xl">
          {product?.salePrice.toLocaleString('ko-KR')}원
        </p>
        {product?.discountPercent !== 0 && (
          <p className="bg-red--500 rounded-xl text-white text-xs font-medium px-[6px] py-[2px]">
            {product?.discountPercent}%
          </p>
        )}
      </div>
    </>
  );
}

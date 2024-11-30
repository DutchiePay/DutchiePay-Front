import Image from 'next/image';
import Link from 'next/link';
import clock from '/public/image/clock.svg';
import { getRemainingTime } from '@/app/_util/getFormatDate';

export default function MainProduct({ product, isHidden }) {
  return (
    <Link
      href={`/commerce/${product?.buyId}`}
      title={product?.productName}
      className="w-[240px] px-[12px] py-[8px] flex flex-col justify-center gap-[4px]"
      aria-hidden={isHidden}
    >
      <div className="w-full h-[210px] relative overflow-hidden rounded-xl">
        <Image
          className="w-full h-[210px] rounded-xl transform transition-transform duration-300 hover:scale-110 object-cover"
          src={product?.productImg}
          alt={product?.productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className="title--single-line font-medium mt-[4px]">
        {product?.productName}
      </p>
      <div className="flex gap-[8px] items-center">
        {product && product.discountPercent !== 0 && (
          <p className="text-[12px] text-gray--500 line-through">
            {product.productPrice.toLocaleString('ko-KR')}원
          </p>
        )}
        <strong className="text-lg text-blue--500">
          {product?.discountPrice.toLocaleString('ko-KR')}원
        </strong>
        {product && product.discountPercent !== 0 && (
          <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
            {product?.discountPercent}%
          </p>
        )}
      </div>
      <div className="flex items-center gap-[4px]">
        <Image
          className="w-[18px] h-[18px]"
          src={clock}
          alt="남은 시간"
          width={18}
          height={18}
        />
        <p className="text-blue--700 text-[12px] font-semibold">
          {getRemainingTime(false, product?.expireDate)}
        </p>
      </div>
    </Link>
  );
}

import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import clock from '/public/image/clock.svg';
import { getRemainingTime } from '@/app/_util/getFormatDate';

export default function HotProduct({ product }) {
  return (
    <Link
      href={`/commerce/${product?.buyId}`}
      title={product?.productName}
      className="w-[480px] flex items-center"
    >
      <div className="w-[200px] h-[200px] relative object-cover">
        <Image
          src={product?.productImg}
          alt={product?.productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="w-[240px] pl-[16px]">
        <div className="flex items-center gap-[4px]">
          <Image
            className="w-[18px] h-[18px]"
            src={clock}
            alt="남은 시간"
            width={18}
            height={18}
          />
          <p className="text-blue--700 text-sm font-semibold">
            {getRemainingTime(false, product?.expireDate)}
          </p>
        </div>
        <p className="line-clamp-2 text-lg font-semibold mt-[4px] text-left">
          {product?.productName}
        </p>
        <div className="flex gap-[8px] items-center">
          <p className="text-[12px] text-gray--500 line-through">
            {product?.productPrice.toLocaleString('ko-KR')}원
          </p>
          <strong className="text-lg text-blue--500">
            {product?.discountPrice.toLocaleString('ko-KR')}원
          </strong>
          <p className="bg-red--500 rounded-2xl text-white text-xs px-[4px] py-[2px]">
            {product?.discountPercent}%
          </p>
        </div>
        <span className="mt-[12px] flex justify-end items-baseline text-xs text-gray--500">
          공구 성공까지{' '}
          <strong className="text-3xl text-blue--500">
            &nbsp;{Math.round((product?.nowCount / product?.skeleton) * 100)}%
          </strong>
        </span>
      </div>
    </Link>
  );
}

'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import DeliveryAndLikeInfo from '@/app/_components/_commerce/_productDetail/DeliveryAndLikeInfo';
import OrderButton from '@/app/_components/_commerce/_productDetail/OrderButton';
import ProductStatus from '@/app/_components/_commerce/_productDetail/ProductStats';
import ProductTitle from '@/app/_components/_commerce/_productDetail/ProductTitle';
import Quantity from '@/app/_components/_commerce/_productDetail/Quantity';
import { useState } from 'react';

export default function ProductInfo({ isEnd, product, productId }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <article className="w-[500px] px-[16px] py-[40px]">
      <ProductTitle product={product} />
      <hr />
      <ProductStatus product={product} />
      <Quantity
        salePrice={product?.salePrice}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <hr />
      <DeliveryAndLikeInfo
        deadline={product?.deadline}
        isLiked={product?.isLiked}
      />
      <OrderButton isEnd={isEnd} productId={productId} quantity={quantity} />
    </article>
  );
}

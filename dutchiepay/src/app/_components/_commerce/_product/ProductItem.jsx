import '@/styles/commerce.css';
import '@/styles/globals.css';

import Link from 'next/link';
import ProductItemBottom from './ProductItemBottom';
import ProductItemHeader from './ProductItemHeader';
import ProductItemInfo from './ProductItemInfo';

export default function ProductItem({ item }) {
  return (
    <Link
      href={`/commerce/${item.buyId}`}
      title={item.productName}
      className="w-[232px] flex flex-col justify-center"
    >
      <ProductItemHeader item={item} />
      <ProductItemInfo item={item} />
      <ProductItemBottom item={item} />
    </Link>
  );
}

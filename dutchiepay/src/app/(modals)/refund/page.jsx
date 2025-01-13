'use client';

import OrderProductInfo from '@/app/_components/_commerce/OrderProductInfo';
import RefundForm from '@/app/_components/_commerce/_refund/RefundForm';
import { useSearchParams } from 'next/navigation';

export default function RefundModal() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderNum = searchParams.get('orderNum');
  const buyId = searchParams.get('buyId');

  return (
    <section className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">교환/환불</h1>
      <p className="text-xs text-gray--500">
        배송 과정에서 파손, 불량 등에 한해 교환/환불이 가능합니다. <br />
        구매자의 단순 변심에 의한 교환/환불은 절대 불가능합니다.
      </p>
      <article className="mt-[40px]">
        <OrderProductInfo buyId={buyId} orderNum={orderNum} />
        <hr />
        <RefundForm orderId={orderId} />
      </article>
    </section>
  );
}

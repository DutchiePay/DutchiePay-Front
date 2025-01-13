'use client';

import AskForm from '@/app/_components/_commerce/_ask/AskForm';
import OrderProductInfo from '@/app/_components/_commerce/OrderProductInfo';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import { useSearchParams } from 'next/navigation';

export default function AskModal() {
  const searchParams = useSearchParams();
  const buyId = searchParams.get('buyId');
  const orderNum = searchParams.get('orderNum');

  return (
    <ProtectedRoute>
      <section className="max-w-[600px] p-[32px] overflow-x-hidden">
        <h1 className="text-3xl font-bold">문의 작성</h1>
        <p className="text-xs text-gray--500">
          문의 작성 서비스는 불편한 서비스로 인한 불만, 분쟁을 해결해드리기 위해
          운영됩니다.
          <br /> 불편한 문의 사항을 작성해주시면 빠르게 답변해드리겠습니다.
        </p>
        <article className="mt-[40px]">
          <OrderProductInfo
            buyId={buyId}
            orderNum={orderNum}
            showRemainingTime={true}
          />
          <hr />
          <AskForm buyId={buyId} />
        </article>
      </section>
    </ProtectedRoute>
  );
}

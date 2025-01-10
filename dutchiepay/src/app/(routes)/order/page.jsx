'use client';

import OrderInfo from '@/app/_components/_commerce/_order/OrderInfo';
import OrderSubmit from '@/app/_components/_commerce/_order/OrderSubmit';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Order() {
  const router = useRouter();

  const productInfo = JSON.parse(sessionStorage.getItem('productInfo'));
  const { product, quantity, productId } = productInfo || {};

  useEffect(() => {
    if (!productInfo) {
      alert('비정상적인 접근입니다.');
      router.push('/');
    } else if (productInfo.quantity < 1 || productInfo.quantity > 100) {
      alert('구매 가능 수량은 1개부터 99개까지입니다.');
      router.push('/');
    }
    const handleMessage = (event) => {
      const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL];

      if (allowedOrigins.includes(event.origin)) {
        if (event.data.type === 'PAYMENT_APPROVED') {
          router.push(`/order/success?orderid=${event.data.orderNum}`);
        } else if (
          event.data.type === 'PAYMENT_CANCEL' ||
          event.data.type === 'PAYMENT_FAIL'
        ) {
          alert('결제가 실패 또는 취소되었습니다. 다시 결제해주세요.');
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      sessionStorage.removeItem('productInfo');
    };
  }, [router, productInfo]);

  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo orderInfo={product} quantity={Number(quantity)} />
      <OrderSubmit quantity={quantity} orderInfo={product} buyId={productId} />
    </section>
  );
}

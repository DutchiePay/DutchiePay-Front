'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useEffect } from 'react';
import AskForm from '@/app/_components/_commerce/_ask/AskForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import OrderProductInfo from '@/app/_components/_commerce/OrderProductInfo';

export default function AskModal() {
  const searchParams = useSearchParams();
  const buyId = searchParams.get('buyId');
  const orderNum = searchParams.get('orderNum');
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn || !access) {
      alert('비정상적인 접속입니다.');
      window.close();
    }
  }, [isLoggedIn, access, router]);

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">문의 작성</h1>
      <p className="text-xs text-gray--500">
        문의 작성 서비스는 불편한 서비스로 인한 불만, 분쟁을 해결해드리기 위해
        운영됩니다.
        <br /> 불편한 문의 사항을 작성해주시면 빠르게 답변해드리겠습니다.
      </p>
      <section className="mt-[40px]">
        <OrderProductInfo
          buyId={buyId}
          orderNum={orderNum}
          showRemainingTime={true}
        />
        <hr />
        <AskForm buyId={buyId} />
      </section>
    </main>
  );
}

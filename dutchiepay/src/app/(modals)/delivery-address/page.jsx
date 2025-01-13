'use client';

import DeliveryAddressForm from '@/app/_components/_mypage/_delivery/DeliveryAddressForm';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import { useSearchParams } from 'next/navigation';

export default function Address() {
  const searchParams = useSearchParams();
  const addressId = searchParams.get('addressid'); // 해당 값이 존재하면 수정, 존재하지 않으면 추가

  return (
    <ProtectedRoute>
      <section className="min-w-[620px] p-[32px]">
        <h1 className="text-3xl font-bold">
          주소지 {addressId ? '수정' : '추가'}
        </h1>
        <DeliveryAddressForm addressId={addressId} />
      </section>
    </ProtectedRoute>
  );
}

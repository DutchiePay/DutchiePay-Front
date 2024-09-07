import '@/styles/globals.css';
import '@/styles/commerce.css';

import AvailableCoupons from '@/app/_components/_commerce/AvailableCoupons';

export default function CouponModal() {
  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">사용 가능한 쿠폰</h1>
      <section className="mt-[40px] flex flex-wrap gap-[12px]">
        <AvailableCoupons />
        <AvailableCoupons />
      </section>
    </main>
  );
}

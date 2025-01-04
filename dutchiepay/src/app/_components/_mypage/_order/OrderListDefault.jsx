import Link from 'next/link';

export default function OrderListDefault() {
  return (
    <article className="min-h-[360px] flex flex-col justify-center items-center">
      <strong className="text-2xl">주문하신 상품이 없습니다.</strong>
      <p className="text-gray--500 text-sm">
        공동구매에서 다양한 상품들을 구매해보세요.
      </p>
      <Link
        className="mt-[16px] px-[24px] py-[8px] text-sm text-white bg-blue--500 rounded"
        href="/commerce"
      >
        공동구매 바로가기
      </Link>
    </article>
  );
}

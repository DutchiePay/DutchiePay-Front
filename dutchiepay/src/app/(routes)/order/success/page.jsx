import Image from 'next/image';
import Link from 'next/link';
import success from '../../../../../public/image/success.svg';

export default function Success() {
  return (
    <section className="h-[750px] w-[1020px] flex justify-center items-center">
      <section className="flex flex-col gap-[16px] justify-center items-center">
        <Image
          className="w-[100px] h-[100px]"
          src={success}
          alt="성공"
          width={100}
          height={100}
        />
        <div
          className="bg-blue--500 w-[500px] py-[16px] text-white text-xl flex justify-center"
          aria-live="assertive"
        >
          주문이 완료 되었습니다.
        </div>
        <p className="text-center text-lg">
          고객님이 주문하신 주문번호는
          <br />
          <strong className="text-red--500">24081612345</strong> 입니다.
        </p>
        <p className="text-xs text-gray--500">
          주문 내역은 마이페이지의 “구매내역”에서 확인하실 수 있습니다.
        </p>
        <div className="flex gap-[12px]">
          <Link
            href="/"
            className="border border-blue--500 text-blue--500 text-center w-[180px] py-[10px] rounded-lg"
            role="button"
          >
            메인으로 이동
          </Link>
          <Link
            href="/mypage/myorder"
            className="bg-blue--500 text-white text-center w-[180px] py-[10px] rounded-lg"
            role="button"
          >
            구매내역으로 이동
          </Link>
        </div>
      </section>
    </section>
  );
}

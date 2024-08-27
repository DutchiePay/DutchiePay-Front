import Image from 'next/image';
import Link from 'next/link';
import event1 from '../../../../public/image/event.png';
import event2 from '../../../../public/image/event2.jpg';
import event3 from '../../../../public/image/event3.jpg';

export default function Event() {
  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <h1 className="mt-[60px] font-bold text-3xl">진행 중인 이벤트</h1>
      <section className="mt-[30px]">
        <ul className="flex flex-col gap-[24px]">
          <li>
            <Link className="flex gap-[16px]" href="/event/1">
              <Image className="rounded-lg w-[300px] h-[150px]" src={event1} alt="이벤트" width={300} height={150} />
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-blue--500 text-3xl">올리브영 Welcome 혜택💚</h2>
                <p>올리브영 온라인몰이 처음이라면 인기 상품이 100원부터!</p>
                <p className="mt-[30px] text-gray-500">24.08.01 ~ 24.12.31</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="flex gap-[16px]" href="/event/2">
              <Image className="rounded-lg w-[300px] h-[150px]" src={event2} alt="이벤트" width={300} height={150} />
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-blue--500 text-3xl">올리브 데이 X 결제혜택</h2>
                <p>결제 혜택으로 할인에 할인 더하기!</p>
                <p className="mt-[30px] text-gray-500">24.08.01 ~ 24.12.31</p>
              </div>
            </Link>
          </li>
          <li>
            <Link className="flex gap-[16px]" href="/event/3">
              <Image className="rounded-lg w-[300px] h-[150px]" src={event3} alt="이벤트" width={300} height={150} />
              <div className="flex flex-col justify-center">
                <h2 className="font-semibold text-blue--500 text-3xl">탑리뷰어 프리미엄 혜택</h2>
                <p>이 곳에서 한 눈에 확인해보세요</p>
                <p className="mt-[30px] text-gray-500">24.08.01 ~ 25.12.31</p>
              </div>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}

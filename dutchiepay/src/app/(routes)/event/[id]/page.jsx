// app/event/[id]/page.tsx

'use client';
import Image from 'next/image';
import event1 from '../../../../../public/image/event/eventDetail1.gif';
import event1_2 from '../../../../../public/image/event/eventDetail1_2.jpg';
import event2 from '../../../../../public/image/event/eventDetail2.gif';
import event2_1 from '../../../../../public/image/event/eventDetail2_1.jpg';
import event3 from '../../../../../public/image/event/eventDetail3.jpg';

const events = [
  {
    id: '1',
    title: '올리브영 Welcome 혜택 💚',
    description: '올리브영 온라인몰이 처음이라면 인기 상품이 100원부터!',
    date: '24.08.01 ~ 24.12.31',
    images: [event1, event1_2],
  },
  {
    id: '2',
    title: '올리브 데이 X 결제혜택',
    date: '24.08.01 ~ 24.12.31',
    images: [event2, event2_1],
  },
  {
    id: '3',
    title: '탑리뷰어 프리미엄 혜택',
    date: '24.08.01 ~ 25.12.31',
    images: [event3],
  },
];

export default function EventPage({ params }) {
  const { id } = params;
  const event = events.find((event) => event.id === id);
  return (
    <main className="min-h-[750px] w-[1020px] mb-[100px]">
      <div className="flex items-center justify-between">
        <h1 className="mt-[60px] font-bold text-3xl text-blue--500">
          {event.title}
        </h1>
        <p className="mt-[60px] text-gray-500">{event.date}</p>
      </div>
      <hr className="mt-[30px] h-[2px] bg-gray--300" />
      <section className="mt-[30px] flex flex-col items-center">
        {event.images.map((src, index) => (
          <Image
            key={index}
            alt={`${event.title} 이미지 ${index + 1}`}
            width={800}
            height={450}
            src={src}
          />
        ))}
      </section>
    </main>
  );
}

import EventDetail from '@/app/_components/EventDetail';
import Image from 'next/image';
import event1 from '../../../../../public/image/event/eventDetail1.gif';
import event1_2 from '../../../../../public/image/event/eventDetail1_2.jpg';
import event2 from '../../../../../public/image/event/eventDetail2.gif';
import event2_1 from '../../../../../public/image/event/eventDetail2_1.jpg';
import event3 from '../../../../../public/image/event/eventDetail3.jpg';

export async function generateStaticParams() {
  const ids = [1, 2, 3]; // 추후 데이터 API

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export default function EventPage({ params }) {
  return <EventDetail />;
}

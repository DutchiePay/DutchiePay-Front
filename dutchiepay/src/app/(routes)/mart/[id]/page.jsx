import Image from 'next/image';
import PostContent from '@/app/_components/_community/PostContent';
import PostDetail from '@/app/_components/_community/PostDetail';

export async function generateStaticParams() {
  const ids = [1, 2, 3]; // 추후 데이터 API

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export default function MartDetail() {
  return (
    <section className="min-h-[750px] w-[1020px] w-full flex">
      <PostContent
        category={'배달'}
        menu={'마트/배달'}
        isMyPostWritten={true}
      />
      <PostDetail menu={'마트/배달'} isMyPostWritten={true} />
    </section>
  );
}

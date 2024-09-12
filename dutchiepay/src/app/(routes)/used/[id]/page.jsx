import Image from 'next/image';
import PostContent from '@/app/_components/_community/PostContent';
import PostDetail from '@/app/_components/_community/PostDetail';

export async function generateStaticParams() {
  const ids = [1, 2, 3]; // 추후 데이터 API

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export default function UsedDetail({ params }) {
  const { id } = params;
  return (
    <section className="w-full flex min-h-[750px] w-[1020px]">
      <PostContent
        category={'거래'}
        menu={'거래/나눔'}
        isMyPostWritten={true}
      />
      <PostDetail menu={'거래/나눔'} isTrade={true} isMyPostWritten={true} />
    </section>
  );
}

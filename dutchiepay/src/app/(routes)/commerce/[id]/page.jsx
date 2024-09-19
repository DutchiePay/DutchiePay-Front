import '@/styles/commerce.css';
import '@/styles/globals.css';

import CommerceTemp from '@/app/_components/_commerce/CommerceTemp';

export async function generateStaticParams() {
  const ids = [1, 2, 3]; // 추후 데이터 API

  return ids.map((id) => ({
    id: id.toString(),
  }));
}

export default function CommerceDetail({ params }) {
  const { id } = { params };
  // 작성 리뷰/문의 없을 때 구현해야 함
  return <CommerceTemp />;
}

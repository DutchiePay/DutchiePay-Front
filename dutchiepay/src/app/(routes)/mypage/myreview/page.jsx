import '../../../../styles/mypage.css';

import Image from 'next/image';
import MyReviews from '@/app/_components/MyReview';

// 리뷰내역 없을 때 UI도 구현해야 함
export default function MyReview() {
  return (
    <main className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">작성한 후기</h1>
      <section className="flex flex-col gap-[12px] mt-[16px]">
        <MyReviews />
        <MyReviews />
        <MyReviews />
        <MyReviews />
      </section>
    </main>
  );
}

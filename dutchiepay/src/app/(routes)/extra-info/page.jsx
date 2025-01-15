'use client';

import AddInfoSubmit from '@/app/_components/_user/AddInfoSubmit';
import ProtectedRoute from '@/app/_components/ProtectedRoute';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ExtraInfo() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isCertified = useSelector((state) => state.login.user.isCertified);
  const router = useRouter();

  useEffect(() => {
    if (isCertified && isLoggedIn) {
      router.push('/');
    }
  }, [router, isCertified, isLoggedIn]);

  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col items-center justify-center min-h-[735px]">
        <article className="flex flex-col w-[500px]">
          <h1 className="text-4xl font-bold">추가 정보 입력</h1>
          <p className="mt-[12px] mb-[24px]">
            가입하신 계정의 <strong>지역</strong>과 <strong>휴대폰 번호</strong>
            로 인증해주시면
            <br />
            정상적으로 더취페이를 <strong>이용</strong> 하실 수 있습니다.
          </p>
          <AddInfoSubmit />
        </article>
      </section>
    </ProtectedRoute>
  );
}

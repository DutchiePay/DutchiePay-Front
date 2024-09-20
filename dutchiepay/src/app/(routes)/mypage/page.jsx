'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Mypage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/mypage/info');
  }, [router]);

  return <div className="h-[740px]"></div>;
}

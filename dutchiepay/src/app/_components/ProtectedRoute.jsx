'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  // 로그인이 되어 있으면 자식 컴포넌트를 렌더링
  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

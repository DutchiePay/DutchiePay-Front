'use client';

import { MYPAGE_ICON, MYPAGE_MENU } from '@/app/_util/constants';

import Image from 'next/image';
import Link from 'next/link';
import profile from '/public/image/profile.jpg';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Sidebar() {
  const userInfo = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('비정상적인 접근입니다.');
      router.push('/');
      return;
    }
  }, [isLoggedIn, router]);

  return (
    <aside className="fixed w-[250px] bg-white px-[16px] py-[40px] flex flex-col items-center gap-[32px]">
      <div className="flex flex-col items-center">
        <div className="relative w-[120px] h-[120px] mb-[12px]">
          <Image
            className="rounded-full border object-cover"
            src={userInfo?.profileImage || profile}
            alt="profile"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <strong>{userInfo?.nickname}</strong>
      </div>
      <ul>
        {Object.entries(MYPAGE_MENU).map(([key, value]) => (
          <li
            className="w-[200px] h-[50px] flex items-center rounded-lg hover:bg-gray-100"
            key={key}
          >
            <Link
              className="w-full flex items-center gap-[12px] p-[8px]"
              href={`/mypage/${value}`}
            >
              <Image src={MYPAGE_ICON[key]} alt={key} width={20} height={20} />
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

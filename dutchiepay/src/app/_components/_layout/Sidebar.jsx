'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

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
            className="rounded-full border"
            src={userInfo?.profileImage || profile}
            alt="profile"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <strong>{userInfo?.nickname}</strong>
      </div>
      <ul>
        {Object.entries(MYPAGE_MENU).map(([key, value]) => (
          <li className="mypage-sidebar-navbar__item" key={key}>
            <Link
              className="mypage-sidebar-navbar__link"
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

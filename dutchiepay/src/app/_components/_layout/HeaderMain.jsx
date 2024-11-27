'use client';

import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '@/app/_components/_layout/SearchInput';
import chat from '/public/image/chat.svg';
import logo from '/public/image/logo.jpg';
import profile from '/public/image/profile.jpg';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function HeaderMain() {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const profileImage = useSelector((state) => state.login.user.profileImage);

  return (
    <div className="flex items-center relative w-full">
      <Link href="/" className="contents w-[160px]">
        <Image
          className="w-[160px] h-[96px] mr-[65px] cursor-pointer object-contain"
          src={logo}
          alt="logo"
          width={160}
          height={96}
          priority
        />
      </Link>
      <SearchInput />

      {isLoggedIn && (
        <div className="flex justify-end w-full">
          <Image
            className="w-[55px] h-[55px]"
            alt="chat"
            width={40}
            height={40}
            src={chat}
          />
          <div className="relative w-[55px] h-[55px] ml-[18px] cursor-pointer">
            <Image
              className="rounded-full border object-cover"
              src={profileImage || profile}
              alt="profile"
              fill
              onClick={() => router.push('/mypage')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

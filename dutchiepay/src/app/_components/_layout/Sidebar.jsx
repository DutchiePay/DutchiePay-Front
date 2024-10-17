'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/image/arrow.svg';
import delivery from '/public/image/delivery.svg';
import heart from '/public/image/heart.svg';
import post from '/public/image/post.svg';
import profile from '/public/image/profile.jpg';
import question from '/public/image/question.svg';
import review from '/public/image/review.svg';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import userIcon from '/public/image/user.svg';

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
  }, []);

  return (
    <aside className="fixed w-[250px] bg-white px-[16px] py-[40px] flex flex-col items-center gap-[32px] z-10">
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
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/info" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={userIcon} alt="user" width={20} height={20} />
              회원정보
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/mypost" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={post} alt="post" width={20} height={20} />
              활동내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myorder" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={delivery} alt="delivery" width={20} height={20} />
              구매내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/like" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={heart} alt="like" width={20} height={20} />
              좋아요한 상품
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myask" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={question} alt="ask" width={20} height={20} />
              문의내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
        <li className="mypage-sidebar-navbar__item">
          <Link href="/mypage/myreview" className="mypage-sidebar-navbar__link">
            <div className="flex gap-[16px]">
              <Image src={review} alt="review" width={20} height={20} />
              후기내역
            </div>
            <Image src={arrow} alt="arrow" width={8} height={12} />
          </Link>
        </li>
      </ul>
    </aside>
  );
}

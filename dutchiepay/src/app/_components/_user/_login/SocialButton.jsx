'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import LastLogin from './LastLogin';
import kakao from '/public/image/kakao.png';
import naver from '/public/image/naver.png';

export default function SocialButton({ type }) {
  const openPopup = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/signup?type=${type}`,
      `${type} 회원가입`,
      'width=600,height=400'
    );
  };

  const getImageSrc = () => {
    return type === 'naver' ? naver : kakao;
  };

  return (
    <button className="relative" onClick={() => openPopup()}>
      <Image
        className="cursor-pointer"
        src={getImageSrc()}
        alt={type}
        width={60}
        height={60}
      />
      <LastLogin type={type} />
    </button>
  );
}

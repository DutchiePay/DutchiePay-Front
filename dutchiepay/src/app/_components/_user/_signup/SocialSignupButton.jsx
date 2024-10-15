'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Image from 'next/image';
import kakao from '/public/image/kakao.png';
import naver from '/public/image/naver.png';

export default function SocialSignupButton({ type }) {
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
    <button
      className={`user-signup__button ${type === 'naver' ? 'bg-[#00c73c]  text-white' : 'bg-[#FBDB44]'}`}
      onClick={() => openPopup()}
      type="button"
    >
      <Image src={getImageSrc()} width={40} height={40} alt={type} />
      <p>{type === 'naver' ? '네이버' : '카카오'}로 시작하기</p>
    </button>
  );
}

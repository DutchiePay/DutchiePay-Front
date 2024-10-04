'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import Cookies from 'universal-cookie';
import Image from 'next/image';
import kakao from '../../../../public/image/kakao.png';
import { login } from '@/redux/slice/loginSlice';
import naver from '../../../../public/image/naver.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SocialSignup() {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const openPopup = (type) => {
    window.open(
      `${process.env.NEXT_PUBLIC_BASE_URL}/oauth/signup?type=${type}`,
      `${type} 회원가입`,
      'width=600,height=400'
    );
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL];

      if (allowedOrigins.includes(event.origin)) {
        const userInfo = {
          userId: event.data.userId,
          nickname: event.data.nickname,
          profileImage: event.data.profileImg,
          location: event.data.location,
          isCertified: event.data.isCertified,
        };

        localStorage.setItem('loginType', event.data.loginType || 'email');
        dispatch(
          login({
            user: userInfo,
            access: event.data.access,
          })
        );

        cookies.set('refresh', event.data.refresh, { path: '/' });

        router.push('/');
        console.log(userInfo);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="flex gap-[20px] h-[70px]">
      <button
        className="user-signup__button bg-[#00c73c] text-white"
        onClick={() => openPopup('naver')}
        type="button"
      >
        <Image src={naver} width={40} height={40} alt="naver" />
        <p>네이버로 시작하기</p>
      </button>
      <button
        className="user-signup__button bg-[#FBDB44]"
        onClick={() => openPopup('kakao')}
        type="button"
      >
        <Image src={kakao} width={40} height={40} alt="kakao" />
        <span>카카오로 시작하기</span>
      </button>
    </div>
  );
}

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import Image from 'next/image';
import LastLogin from './LastLogin';
import kakao from '../../../../public/image/kakao.png';
import { login } from '@/redux/slice/loginSlice';
import naver from '../../../../public/image/naver.png';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function SocialLogin() {
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
    <section>
      <h2 className="user-login-sns__title">&nbsp;SNS 계정으로 로그인&nbsp;</h2>
      <div className="flex mt-[24px] gap-[60px] items-center justify-center">
        <button className="relative" onClick={() => openPopup('naver')}>
          <Image
            className="w-[60px] h-[60px] cursor-pointer"
            src={naver}
            alt="naver"
          />
          <LastLogin type={'naver'} />
        </button>
        <button className="relative" onClick={() => openPopup('kakao')}>
          <Image
            className="w-[60px] h-[60px] cursor-pointer"
            src={kakao}
            alt="kakao"
          />
          <LastLogin type={'kakao'} />
        </button>
      </div>
    </section>
  );
}

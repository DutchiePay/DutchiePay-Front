'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import { useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
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

      if (
        allowedOrigins.includes(event.origin) &&
        event.data.type === 'OAUTH_LOGIN'
      ) {
        const encryptedData = CryptoJS.enc.Base64.parse(event.data.encrypted);
        const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY);
        const decrypted = CryptoJS.AES.decrypt(
          { ciphertext: encryptedData },
          key,
          {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }
        ).toString(CryptoJS.enc.Utf8);

        const extracted = decrypted
          .trim()
          .split(',')
          .map((item) => {
            const value = item.split(':')[1].trim();
            return value.replace(/(^"|"$)/g, '');
          });

        const userInfo = {
          userId: Number(extracted[0]),
          nickname: extracted[2],
          profileImage: extracted[3] === 'null' ? null : extracted[3],
          location: extracted[4],
          isCertified: extracted[7] === 'ture' ? true : false,
        };

        localStorage.setItem('loginType', extracted[1] || 'email');
        dispatch(
          login({
            user: userInfo,
            access: extracted[5],
          })
        );

        cookies.set('refresh', extracted[6], { path: '/' });

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

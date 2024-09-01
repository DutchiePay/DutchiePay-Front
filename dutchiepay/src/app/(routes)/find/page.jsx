'use client';

import '@/styles/globals.css';
import '@/styles/user.css';

import FindSuccess from '@/app/_components/FindSuccess';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/image/logo.jpg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Find() {
  const [tab, setTab] = useState('아이디(이메일) 찾기');
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleTab = (e) => {
    setTab(e.target.innerText);
    setIsSuccess(false);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    router.push('/reset?email=email@naver.com');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[890px]">
      <h1>
        <Link href="/">
          <Image
            className="w-[200px] h-[120px] mb-[16px]"
            src={logo}
            alt="더취페이"
            width={200}
            height={120}
          />
        </Link>
      </h1>
      <div className="flex justify-center">
        <div
          className={`user-find__header ${tab === '아이디(이메일) 찾기' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          아이디(이메일) 찾기
        </div>
        <div
          className={`user-find__header ${tab === '비밀번호 재설정' ? 'user-find__header__active' : ''}`}
          onClick={handleTab}
        >
          비밀번호 재설정
        </div>
      </div>
      <section className="mb-[32px] w-[500px]">
        {isSuccess ? (
          <FindSuccess />
        ) : (
          <>
            {tab === '아이디(이메일) 찾기' && (
              <div className="mt-[40px] min-h-[340px]">
                <p className="mb-[40px]">
                  가입 시 등록한 <strong>휴대폰 번호</strong>를 입력하시면
                  <br />
                  이메일 주소의 <strong>일부</strong>를 알려드립니다.
                </p>

                <form className="flex flex-col gap-[12px]">
                  <div className="flex gap-[8px] items-baseline">
                    <label className="user__label">휴대폰 번호</label>
                    <p className="ml-[8px] text-sm">
                      -을 제외한 번호를 입력해주세요
                    </p>
                  </div>
                  <input
                    className="user__input"
                    placeholder="휴대폰 번호 (ex : 01012345678)"
                    type="text"
                  />

                  <button
                    type="submit"
                    className="user__button-blue"
                    onClick={() => setIsSuccess(true)}
                  >
                    아이디(이메일) 찾기
                  </button>
                </form>
              </div>
            )}
            {tab === '비밀번호 재설정' && (
              <div className="mt-[40px]">
                <p className="mb-[40px]">
                  가입 시 등록한 <strong>휴대폰 번호</strong>와{' '}
                  <strong>이메일 주소</strong>를 입력하시면
                  <br />
                  비밀번호를 <strong>재설정</strong> 하실 수 있습니다.
                </p>

                <form className="flex flex-col gap-[12px]">
                  <label className="user__label">이메일 주소</label>
                  <input
                    className="user__input"
                    placeholder="이메일 주소"
                    type="email"
                  />

                  <div className="flex gap-[8px] items-baseline">
                    <label className="user__label">휴대폰 번호</label>
                    <p className="ml-[8px] text-sm">
                      -을 제외한 번호를 입력해주세요
                    </p>
                  </div>
                  <input
                    className="user__input"
                    placeholder="휴대폰 번호 (ex : 01012345678)"
                    type="text"
                  />

                  <button
                    type="submit"
                    className="user__button-blue"
                    onClick={handlePassword}
                  >
                    비밀번호 재설정
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

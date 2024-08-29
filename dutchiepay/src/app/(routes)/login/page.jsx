"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/image/logo.jpg";
import eyeOpen from "../../../../public/image/eyeOpen.svg";
import eyeClosed from "../../../../public/image/eyeClosed.svg";
import naver from "../../../../public/image/naver.png";
import kakao from "../../../../public/image/kakao.png";
import "../../../styles/login.css";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const loginType = "naver";

  const handleCilckEyeIcon = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <main className="h-[890px] flex items-center justify-center">
      <div className="flex flex-col gap-[16px] justify-center items-center">
        <Link href="/">
          <Image
            className="w-[200px] h-[120px] mb-[16px]"
            src={logo}
            alt="logo"
            width={200}
            height={120}
          />
        </Link>

        <section className="text-center mb-[32px] w-[500px]">
          <form>
            {/* 리액트 훅 폼 적용시 변경 예정*/}
            <div className="mb-[16px]">
              <input
                className="login__input"
                placeholder="아이디"
                type="text"
              />
            </div>

            <div className="mb-[16px] flex relative">
              <input
                className="login__input"
                placeholder="비밀번호"
                type={isVisible ? "text" : "password"}
              />
              <Image
                className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                src={isVisible ? eyeOpen : eyeClosed}
                alt="eyes"
                onClick={handleCilckEyeIcon}
              />
            </div>

            <div className="mt-[46px] mb-[16px]">
              <button type="submit" className="login-login__button">
                로그인
              </button>
            </div>

            <div>
              <a href="/signup" className="login-signup__button">
                회원가입
              </a>
            </div>

            <div className="flex align-start items-center mt-[16px] mb-[16px]">
              <input type="checkbox" className="login__checkbox" />
              <label className="ml-[14px] text-gray--500">자동 로그인</label>
            </div>
          </form>

          <article>
            <h2 className="login-sns__title text-[20px]">
              SNS 계정으로 로그인
            </h2>
            <div className="flex mt-[24px] items-center justify-center relative">
              <div className="relative">
                <Image
                  className="w-[70px] h-[70px] mr-[54px] cursor-pointer"
                  src={naver}
                  alt="naver"
                />
                {loginType === "naver" && (
                  <div className="login__last-login login__last-login--naver">
                    <p>
                      마지막으로<br></br> 로그인한 방식입니다.
                    </p>
                  </div>
                )}
              </div>
              <div className="relative">
                <Image
                  className="w-[70px] h-[70px] cursor-pointer"
                  src={kakao}
                  alt="kakao"
                />
                {loginType === "kakao" && (
                  <div className="login__last-login login__last-login--kakao">
                    <p>
                      마지막으로
                      <br /> 로그인한 방식입니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

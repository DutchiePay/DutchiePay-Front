"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../../public/image/logo.jpg";
import eyeOpen from "../../../../public/image/eyeOpen.svg";
import eyeClosed from "../../../../public/image/eyeClosed.svg";
import naver from "../../../../public/image/naver.png";
import kakao from "../../../../public/image/kakao.png";
import "../../../styles/find.css";

export default function ResetNonUser() {
  const [isVisible, setIsVisible] = useState(false);
  const [tab, setTab] = useState(1);
  const handleCilckEyeIcon = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <header>
        <Image
          className="w-[200px] h-[120px] mb-[16px]"
          src={logo}
          alt="logo"
          width={200}
          height={120}
        />
      </header>
      <div className="flex justify-center">
        <div
          className={`find__div ${tab === 1 ? "active" : ""}`}
          onClick={() => setTab(1)}
        >
          <p>아이디 찾기</p>
        </div>
        <div
          className={`find__div ${tab === 2 ? "active" : ""}`}
          onClick={() => setTab(2)}
        >
          <p>비밀번호 재설정</p>
        </div>
      </div>
      <section className="text-center mb-[32px] w-[500px]">
        <>
          {tab === 1 && (
            <>
              <div className="text=center mt-[92px]  w-[450px] m-0 m-auto">
                <p className="text-[18px] mb-[60px]">
                  가입 시 등록한 휴대폰 번호를 입력하면
                  <br />
                  이메일 주소의 일부를 알려드립니다.
                </p>
                <h2 className="find__label">휴대폰 번호</h2>
                <form>
                  <div className="mt-[16px] mb-[16px]">
                    <input
                      className="find__input"
                      placeholder="가입하신 휴대폰 번호"
                      type="text"
                    />
                  </div>
                  <div className="mt-[40px]">
                    <button type="submit" className="find__button">
                      이메일 아이디 찾기
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {tab === 2 && (
            <>
              <div className="text=center mt-[92px]  w-[450px] m-0 m-auto">
                {/* <p className="text-[18px] mb-[60px]"></p> */}
                <div className="flex items-center">
                  <h2 className="find__label">새로운 비밀번호</h2>
                  <span className="ml-[8px] text-[12px]">
                    영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
                  </span>
                </div>
                <form>
                  <div className="mt-[16px] mb-[16px] flex relative">
                    <input
                      className="find__input"
                      placeholder="새로운 비밀번호"
                      type={isVisible ? "text" : "password"}
                    />
                    <Image
                      className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                      src={isVisible ? eyeOpen : eyeClosed}
                      alt="eyes"
                      onClick={handleCilckEyeIcon}
                    />
                  </div>
                  <h2 className="find__label">비밀번호 확인</h2>

                  <div className="mt-[16px] mb-[16px] flex relative">
                    <input
                      className="find__input"
                      placeholder="새로운 비밀번호 확인"
                      type={isVisible ? "text" : "password"}
                    />
                    <Image
                      className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                      src={isVisible ? eyeOpen : eyeClosed}
                      alt="eyes"
                      onClick={handleCilckEyeIcon}
                    />
                  </div>
                  <div className="mt-[26px]">
                    <button type="submit" className="find__button">
                      비밀번호 변경하기
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      </section>
    </main>
  );
}

"use client";
import { useState } from "react";
import PolicyDetail from "@/app/_components/PolicyDetail";
import Image from "next/image";
import logo from "../../../../public/image/logo.jpg";
import eyeOpen from "../../../../public/image/eyeOpen.svg";
import eyeClosed from "../../../../public/image/eyeClosed.svg";
import naver from "../../../../public/image/naver.png";
import kakao from "../../../../public/image/kakao.png";
import "../../../styles/signup.css";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handlePasswordVisibilityClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibilityClick = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleTogglePolicy = () => {
    setShowPolicy((prev) => !prev);
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

      <h2 className="text-[20px] font-bold text-start w-[500px] mb-[16px]">
        간편 회원가입
      </h2>
      <section className="text-center mb-[32px] w-[500px] ">
        <div className="signup-naver__button" onClick={() => {}}>
          <Image
            className="absolute top-[50%] left-[134px] transform -translate-y-1/2 cursor-pointer"
            src={naver}
            width={40}
            height={40}
            alt="naver"
          />
          <span className="">네이버로 시작하기</span>
        </div>
        <div className="signup-kakao__button" onClick={() => {}}>
          <Image
            className="absolute top-[50%] left-[134px] transform -translate-y-1/2 cursor-pointer"
            src={kakao}
            width={40}
            height={40}
            alt="kakao"
          />
          <span className="">카카오로 시작하기</span>
        </div>
        <hr className="w-[500px] my-[20px] border-t-[2px] border-gray--300" />
        <form>
          <h2 className="signup__label">이메일</h2>
          <div className="mb-[16px]">
            <input
              className="signup__input"
              placeholder="이메일 주소"
              type="email"
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">비밀번호</h2>
            <span className="ml-[8px] text-[12px]">
              영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
            </span>
          </div>
          <div className="mb-[16px] flex relative">
            <input
              className="signup__input"
              placeholder="비밀번호"
              type={isPasswordVisible ? "text" : "password"}
            />
            <Image
              className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
              src={isPasswordVisible ? eyeOpen : eyeClosed}
              alt="eyes"
              onClick={handlePasswordVisibilityClick}
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">비밀번호 확인</h2>
            <span className="ml-[8px] text-[12px]">
              비밀번호를 한 번 더 입력해주세요
            </span>
          </div>
          <div className="mb-[16px] flex relative">
            <input
              className="signup__input"
              placeholder="비밀번호 확인"
              type={isConfirmPasswordVisible ? "text" : "password"}
            />
            <Image
              className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
              src={isConfirmPasswordVisible ? eyeOpen : eyeClosed}
              alt="eyes"
              onClick={handleConfirmPasswordVisibilityClick}
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">우리동네</h2>
          </div>
          <div className="mb-[16px] flex relative">
            <input
              disabled
              className="signup__input bg-gray--100"
              value={"부산광역시"}
              type="text"
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">성함(선택)</h2>
          </div>
          <div className="mb-[16px] flex relative">
            <input className="signup__input" placeholder="성함" type="text" />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">닉네임</h2>
          </div>
          <div className="mb-[16px] flex relative">
            <input className="signup__input" placeholder="닉네임" type="text" />
          </div>
          <div className="flex align-start items-center mt-[16px] mb-[16px] justify-between">
            <div className="flex align-start items-center">
              <input
                type="checkbox"
                className="login__checkbox"
                id="signup-policy__checkbox"
              />
              <label
                className="ml-[14px] text-gray-500 cursor-pointer"
                htmlFor="signup-policy__checkbox"
              >
                [필수] 1. 개인정보 수집 및 이용 안내
              </label>
            </div>
            <span
              className="text-end text-[32px] cursor-pointer"
              onClick={handleTogglePolicy}
            >
              {showPolicy ? "-" : "+"}
            </span>
          </div>
          {showPolicy && <PolicyDetail></PolicyDetail>}
        </form>
        <div className="mb-[70px]">
          <button className="signup__button" disabled>
            회원가입
          </button>
        </div>
      </section>
    </main>
  );
}

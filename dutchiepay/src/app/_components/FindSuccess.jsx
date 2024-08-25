"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/image/logo.jpg";
import "../../styles/find.css";

export default function FindSuccess() {
  return (
    <section className="text-center mb-[32px] w-[500px]">
      <div className="text-center mt-[92px]  w-[450px] m-0 m-auto">
        <p className="text-[18px] mb-[60px]">
          휴대폰 정보와 일치하는 아이디 입니다.
        </p>
        <p className="text-center text-[24px] text-gray--500">
          아이디: q*******3@naver.com
        </p>
      </div>
      <div className="flex items-center justify-center  mt-[64px]">
        <button className="block border-none rounded-[5px] mr-[24px] pt-[18px] pr-[24px] pb-[18px] pl-[24px] text-bold w-[174px] bg-blue--500 text-white text-[14px] align-center;">
          확인
        </button>
        <button className="block border border-blue--500 rounded-[5px] pt-[18px] pr-[24px] pb-[18px] pl-[24px] text-bold w-[174px] bg-white text-blue--500 text-[14px] align-center;">
          비밀번호 재설정
        </button>
      </div>
    </section>
  );
}

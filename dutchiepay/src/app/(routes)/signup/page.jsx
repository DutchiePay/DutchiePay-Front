"use client";

import "../../../styles/signup.css";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import PolicyDetail from "@/app/_components/PolicyDetail";
import axios from "axios";
import eyeClosed from "../../../../public/image/eyeClosed.svg";
import eyeOpen from "../../../../public/image/eyeOpen.svg";
import kakao from "../../../../public/image/kakao.png";
import logo from "../../../../public/image/logo.jpg";
import naver from "../../../../public/image/naver.png";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isShowPolicy, setIsShowPolicy] = useState(false);
  const [address, setAddress] = useState("");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const rEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const rPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const rNickname = /^[a-zA-Z0-9가-힣]{2,8}$/;
  const rPhone = /^010\d{8}$/;
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handlePasswordVisibilityClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibilityClick = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const handleTogglePolicy = () => {
    setIsShowPolicy((prev) => !prev);
  };

  const onSubmit = async (formData) => {
    const { confirmPassword, policy, name = "", ...userData } = formData;
    const payload = {
      ...userData,
      address,
      name: name.trim() === "" ? null : name,
    };
    console.log(payload);
    try {
      const response = await axios.post("/users/signup", payload);
      console.log("회원가입 성공:", response.data);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            console.log(address);

            const addressString = data.address
              ? `${data.address.borough || ""} ${
                  data.address.suburb || ""
                }`.trim()
              : "주소를 찾을 수 없습니다.";
            setAddress(addressString);
          } catch (error) {
            console.error("API 호출 실패:", error);
            setAddress("주소를 찾을 수 없습니다.");
          }
        },
        (error) => {
          console.error("위치를 가져오는 데 실패했습니다:", error);
        }
      );
    } else {
      console.error("Geolocation API를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      <Link href="/">
        <Image
          className="w-[200px] h-[120px] mb-[8px]"
          src={logo}
          alt="logo"
          width={200}
          height={120}
        />
      </Link>

      <h2 className="text-[20px] font-bold text-start w-[500px] mb-[16px]">
        간편 회원가입
      </h2>
      <section className="text-center  w-[500px] ">
        <div className="flex gap-[20px] h-[70px]">
          <div className="signup-naver__button" onClick={() => {}}>
            <Image
              className="absolute top-[50%] left-[15px] transform -translate-y-1/2 cursor-pointer"
              src={naver}
              width={40}
              height={40}
              alt="naver"
            />
            <span>네이버로 시작하기</span>
          </div>
          <div className="signup-kakao__button" onClick={() => {}}>
            <Image
              className="absolute top-[50%] left-[15px] transform -translate-y-1/2 cursor-pointer"
              src={kakao}
              width={40}
              height={40}
              alt="kakao"
            />
            <span>카카오로 시작하기</span>
          </div>
        </div>
        <hr className="w-[500px] my-[10px] border-t-[2px] border-gray--300" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="signup__label">이메일</h2>
          <div className="mb-[8px]">
            <input
              className={`signup__input ${
                errors.email
                  ? "invalid"
                  : touchedFields.email && !errors.email
                  ? "valid"
                  : ""
              }`}
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: rEmail,
                  message: "올바른 이메일 형식을 입력해주세요",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-start text-red--500">{errors.email.message}</p>
          )}
          {!errors.email && touchedFields.email && (
            <p className="text-start text-blue--500 ">유효한 이메일 입니다.</p>
          )}
          <div className="flex items-center">
            <h2 className="signup__label">비밀번호</h2>
            <span className="ml-[8px] text-[12px]">
              영문, 특수문자, 숫자를 모두 포함하여 8글자 이상
            </span>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              className={`signup__input ${
                errors.password
                  ? "invalid"
                  : touchedFields.password && !errors.password
                  ? "valid"
                  : ""
              }`}
              placeholder="비밀번호"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                min: 8,
                pattern: {
                  value: rPassword,
                  message: "올바른 비밀번호 형식을 입력해주세요",
                },
              })}
            />
            {password && (
              <Image
                className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                src={isPasswordVisible ? eyeOpen : eyeClosed}
                alt="eyes"
                onClick={handlePasswordVisibilityClick}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-start text-red--500">
              {errors.password.message}
            </p>
          )}
          {!errors.password && touchedFields.password && (
            <p className="text-start text-blue--500 ">유효한 비밀번호입니다.</p>
          )}
          <div className="flex items-center">
            <h2 className="signup__label">비밀번호 확인</h2>
            <span className="ml-[8px] text-[12px]">
              비밀번호를 한 번 더 입력해주세요
            </span>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              className={`signup__input ${
                rPassword.test(password) &&
                (errors.confirmPassword
                  ? "invalid"
                  : touchedFields.confirmPassword && !errors.confirmPassword
                  ? "valid"
                  : "")
              }`}
              placeholder="비밀번호 확인"
              type={isConfirmPasswordVisible ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value) => {
                  // 비밀번호가 패턴을 충족할 때만 비밀번호 확인 유효성 검사 수행
                  if (!rPassword.test(password)) {
                    return "";
                  }
                  return value === password || "비밀번호가 일치하지 않습니다.";
                },
              })}
            />
            {confirmPassword && (
              <Image
                className="absolute top-[50%] right-[24px] transform -translate-y-1/2 cursor-pointer"
                src={isConfirmPasswordVisible ? eyeOpen : eyeClosed}
                alt="eyes"
                onClick={handleConfirmPasswordVisibilityClick}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-start text-red--500">
              {errors.confirmPassword.message}
            </p>
          )}
          {!errors.confirmPassword && touchedFields.confirmPassword && (
            <p className="text-start text-blue--500">비밀번호가 일치합니다.</p>
          )}
          <div className="flex items-center">
            <h2 className="signup__label">우리동네</h2>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              disabled
              className="signup__input bg-gray--100"
              value={address}
              type="text"
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">성함(선택)</h2>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              className="signup__input"
              placeholder="성함"
              type="text"
              {...register("name")}
            />
          </div>
          <div className="flex items-center">
            <h2 className="signup__label">닉네임</h2>
            <span className="ml-[8px] text-[12px]">
              한글, 영문, 숫자만을 포함하여 2글자 이상 8글자 이하
            </span>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              className={`signup__input ${
                errors.nickname
                  ? "invalid"
                  : touchedFields.nickname && !errors.nickname
                  ? "valid"
                  : ""
              }`}
              placeholder="닉네임"
              type="text"
              maxLength={8}
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                pattern: {
                  value: rNickname,
                  message: "올바른 닉네임 형식을 입력해주세요",
                },
              })}
            />
          </div>
          {errors.nickname && (
            <p className="text-start text-red--500">
              {errors.nickname.message}
            </p>
          )}
          {!errors.nickname && touchedFields.nickname && (
            <p className="text-start text-blue--500">유효한 닉네임입니다.</p>
          )}
          <div className="flex items-center">
            <h2 className="signup__label">휴대폰 번호</h2>
            <span className="ml-[8px] text-[12px]">
              -을 제외하고 번호를 입력해주세요
            </span>
          </div>
          <div className="mb-[8px] flex relative">
            <input
              className={`signup__input ${
                errors.phone
                  ? "invalid"
                  : touchedFields.phone && !errors.phone
                  ? "valid"
                  : ""
              }`}
              placeholder="휴대폰 번호"
              type="text"
              maxLength={11}
              {...register("phone", {
                required: "휴대폰 번호을 입력해주세요",
                pattern: {
                  value: rPhone,
                  message: "올바른 휴대폰 번호 형식을 입력해주세요",
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-start text-red--500">{errors.phone.message}</p>
          )}
          {!errors.phone && touchedFields.phone && (
            <p className="text-start text-blue--500">
              유효한 휴대폰 번호입니다.
            </p>
          )}
          <div className="flex align-start items-center mt-[16px]  justify-between">
            <div className="flex align-start items-center">
              <input
                className="signup__checkbox"
                id="signup-policy__checkbox"
                type="checkbox"
                {...register("policy", {
                  required: "정책에 동의하셔야 합니다.",
                })}
              />

              <label
                className="ml-[14px] text-gray-500 cursor-pointer"
                htmlFor="signup-policy__checkbox"
              >
                [필수] 개인정보 수집 및 이용 안내
              </label>
            </div>

            <span
              className="text-end text-[32px] cursor-pointer"
              onClick={handleTogglePolicy}
            >
              {isShowPolicy ? "-" : "+"}
            </span>
          </div>
          {isShowPolicy && <PolicyDetail />}
          {errors.policy && (
            <p className="text-start text-red--500 mb-[16px]">
              {errors.policy.message}
            </p>
          )}
          <div className="mb-[70px]">
            <button
              type="submit"
              className={`signup__button ${!isValid ? "disabled" : ""}`}
              disabled={!isValid}
            >
              회원가입
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

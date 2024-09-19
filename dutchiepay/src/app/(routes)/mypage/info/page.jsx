'use client';

import '../../../../styles/mypage.css';

import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import getLocation from '@/app/_components/_user/GetLocation';
import kakao from '../../../../../public/image/kakao.png';
import naver from '../../../../../public/image/naver.png';
import profile from '../../../../../public/image/profile.jpg';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';

export default function Info() {
  const loginType = 'email'; // naver / email / kakao
  const [modifyType, setModifyType] = useState(''); // 수정 중인 영역 ''일 경우 아무 것도 수정 중이지 않은 상태
  const [userInfo, setUserInfo] = useState({
    nickname: '한유진',
    profileImage: profile,
    phoneNumber: '01012345678',
    location: '평택시',
    zipcode: '06041',
    address: '서울 강남구 논현동 29-7',
    detail: '1102호',
  });
  const [modifyInfo, setModifyInfo] = useState({
    nickname: userInfo.nickname,
    phoneNumber: userInfo.phoneNumber,
    zipcode: userInfo.zipcode,
    address: userInfo.address,
    detail: userInfo.detail,
  });
  const open = useDaumPostcodePopup();

  const handleModifyType = (type) => {
    // 수정할 타입이 현재 타입과 다를 때만 취소 함수 호출
    if (modifyType && modifyType !== type) {
      handleModifyCancel(); // 이전 수정 상태 취소
    }
    setModifyType(modifyType === type ? '' : type); // 같은 타입일 경우 취소, 다른 타입일 경우 새로 설정
  };
  // 수정 취소
  const handleModifyCancel = () => {
    setModifyInfo({
      nickname: userInfo.nickname,
      phoneNumber: userInfo.phoneNumber,
      zipcode: userInfo.zipcode,
      address: userInfo.address,
      detail: userInfo.detail,
    });
    setModifyType('');
  };
  // 추후 수정 취소 대비해서 값을 일시저장하는 느낌으로 변경
  const handlePostCode = (e) => {
    e.preventDefault();
    open({
      onComplete: (data) => {
        setModifyInfo((prevState) => ({
          ...prevState,
          zipcode: data.zonecode,
          address: data.jibunAddress,
        }));
      },
      width: 500,
      height: 600,
      left: window.innerWidth / 2 - 500 / 2,
      top: window.innerHeight / 2 - 600 / 2,
    });
  };

  const handleGetCurrentLocation = async () => {
    // 정말 재설정 할 것인지 물어보는 alert 추가
    const location = await getLocation();
    setUserInfo((prevState) => ({
      ...prevState,
      location: location,
    }));
  };
  const handleModifyComplete = () => {
    switch (modifyType) {
      case '닉네임':
        const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,8}$/;
        if (!nicknameRegex.test(modifyInfo.nickname)) {
          alert('닉네임은 2~8자의 한글, 영문 또는 숫자로만 가능합니다.');
          return;
        }
        break;
      case '전화번호':
        const phoneRegex = /^010\d{7,8}$/;
        if (!phoneRegex.test(modifyInfo.phoneNumber)) {
          alert('전화번호 형식이 올바르지 않습니다. ex)01012345678');
          return;
        }
        break;
      case '주소':
        if (!modifyInfo.zipcode || !modifyInfo.address || !modifyInfo.detail) {
          alert('우편번호, 주소 및 상세 주소를 모두 입력해주세요.');
          return;
        }
        break;
      default:
        break;
    }
    setUserInfo((prevState) => ({
      ...prevState,
      ...modifyInfo,
    }));
    setModifyType('');
  };

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">회원 정보</h1>
      <section className="mt-[40px] flex flex-col gap-[36px] mb-[24px]">
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">
              프로필
              <br />
              이미지
            </h2>
            <Image
              className="w-[150px] h-[150px] rounded-full border mb-[12px]"
              src={profile}
              alt="profile"
              width={150}
              height={150}
            />
          </div>
          <div className="flex gap-[12px]">
            {modifyType === '프로필이미지' && (
              <button
                className="mypage-profile__button"
                onClick={() => setModifyType('')}
              >
                변경취소
              </button>
            )}
            <button
              className={`mypage-profile__button ${modifyType === '프로필이미지' && 'mypage-profile__button-finish'}`}
              onClick={() => handleModifyType('프로필이미지')}
            >
              {modifyType === '프로필이미지' ? '변경완료' : '변경'}
            </button>
          </div>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">닉네임</h2>
            {modifyType === '닉네임' ? (
              <input
                className="px-[8px] py-[4px] border rounded-lg outline-none"
                value={modifyInfo.nickname || ''}
                onChange={(e) =>
                  setModifyInfo((prevState) => ({
                    ...prevState,
                    nickname: e.target.value,
                  }))
                }
                placeholder="닉네임"
              />
            ) : (
              <p className="mypage-profile__value">{userInfo.nickname}</p>
            )}
          </div>
          <div className="flex gap-[12px]">
            {modifyType === '닉네임' && (
              <button
                className="mypage-profile__button"
                onClick={handleModifyCancel}
              >
                변경취소
              </button>
            )}
            <button
              className={`mypage-profile__button ${modifyType === '닉네임' && 'mypage-profile__button-finish'}`}
              onClick={() => {
                modifyType === '닉네임'
                  ? handleModifyComplete()
                  : handleModifyType('닉네임');
              }}
            >
              {modifyType === '닉네임' ? '변경완료' : '변경'}
            </button>
          </div>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">지역</h2>
            <p className="mypage-profile__value">{userInfo.location}</p>
          </div>
          <button
            className="mypage-profile__button"
            onClick={handleGetCurrentLocation}
          >
            재설정
          </button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">주소</h2>
            {modifyType === '주소' ? (
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[8px]">
                  <input
                    className="w-[250px] px-[8px] py-[4px] border rounded-lg outline-none"
                    value={modifyInfo.address || ''}
                    onChange={(e) =>
                      setModifyInfo((prevState) => ({
                        ...prevState,
                        address: e.target.value,
                      }))
                    }
                    placeholder="지번 주소"
                    disabled={modifyInfo.address ? true : false}
                  />
                  <button
                    className="px-[8px] text-white text-sm bg-blue--500 rounded-lg"
                    onClick={handlePostCode}
                  >
                    우편번호 찾기
                  </button>
                </div>
                <input
                  className="w-[150px] px-[8px] py-[4px] border rounded-lg outline-none"
                  value={modifyInfo.detail || ''}
                  onChange={(e) =>
                    setModifyInfo((prevState) => ({
                      ...prevState,
                      detail: e.target.value,
                    }))
                  }
                  placeholder="상세 주소"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="mypage-profile__value">
                  {userInfo.address} ({userInfo.zipcode})
                </p>
                <p className="mypage-profile__value">{userInfo.detail}</p>
              </div>
            )}
          </div>
          <div className="flex gap-[12px]">
            {modifyType === '주소' && (
              <button
                className="mypage-profile__button"
                onClick={handleModifyCancel}
              >
                변경취소
              </button>
            )}
            <button
              className={`mypage-profile__button ${modifyType === '주소' && 'mypage-profile__button-finish'}`}
              onClick={() => {
                modifyType === '주소'
                  ? handleModifyComplete()
                  : handleModifyType('주소');
              }}
            >
              {modifyType === '주소' ? '변경완료' : '변경'}
            </button>
          </div>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">전화번호</h2>
            {modifyType === '전화번호' ? (
              <input
                className="px-[8px] py-[4px] border rounded-lg outline-none"
                value={modifyInfo.phoneNumber || ''}
                onChange={(e) =>
                  setModifyInfo((prevState) => ({
                    ...prevState,
                    phoneNumber: e.target.value,
                  }))
                }
                placeholder="전화번호 (ex) 01012345678)"
              />
            ) : (
              <p className="mypage-profile__value">{userInfo.phoneNumber}</p>
            )}
          </div>
          <div className="flex gap-[12px]">
            {modifyType === '전화번호' && (
              <button
                className="mypage-profile__button"
                onClick={handleModifyCancel}
              >
                변경취소
              </button>
            )}
            <button
              className={`mypage-profile__button ${modifyType === '전화번호' && 'mypage-profile__button-finish'}`}
              onClick={() => {
                modifyType === '전화번호'
                  ? handleModifyComplete()
                  : handleModifyType('전화번호');
              }}
            >
              {modifyType === '전화번호' ? '번호인증' : '변경'}
            </button>
          </div>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">계정정보</h2>
            {loginType === 'email' ? (
              <p className="mypage-profile__value">email123@naver.com</p>
            ) : loginType === 'kakao' ? (
              <div className="flex items-center gap-[12px]">
                <Image
                  className="w-[28px] h-[28px] rounded-full"
                  src={kakao}
                  alt="kakao"
                  width={30}
                  height={30}
                />
                <p>카카오 연동중</p>
              </div>
            ) : (
              <div className="flex items-center gap-[12px]">
                <Image
                  className="w-[28px] h-[28px] rounded-full"
                  src={naver}
                  alt="naver"
                  width={30}
                  height={30}
                />
                <p>네이버 연동중</p>
              </div>
            )}
          </div>
          {loginType === 'email' && (
            <Link
              href="/reset"
              className="mypage-profile__button-reset"
              role="button"
            >
              비밀번호 변경
            </Link>
          )}
        </article>
        <button className="flex justify-end text-[14px] text-gray--500 hover:underline">
          회원탈퇴
        </button>
      </section>
    </section>
  );
}

import '../../../../styles/mypage.css';

import Image from 'next/image';
import kakao from '../../../../../public/image/kakao.png';
import naver from '../../../../../public/image/naver.png';
import profile from '../../../../../public/image/profile.jpg';

export default function Info() {
  const loginType = 'naver'; // naver / email / kakao

  return (
    <main className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
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
          <button className="mypage-profile__button">변경</button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">닉네임</h2>
            <p className="mypage-profile__value">한유진</p>
          </div>
          <button className="mypage-profile__button">변경</button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">지역</h2>
            <p className="mypage-profile__value">평택시</p>
          </div>
          <button className="mypage-profile__button">재설정</button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">주소</h2>
            <div className="flex flex-col">
              <p className="mypage-profile__value">경기도 평택시 서정로 67</p>
              <p className="mypage-profile__value">203호</p>
            </div>
          </div>
          <button className="mypage-profile__button">변경</button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">전화번호</h2>
            <p className="mypage-profile__value">01012345678</p>
          </div>
          <button className="mypage-profile__button">변경</button>
        </article>
        <article className="mypage-profile">
          <div className="flex items-center">
            <h2 className="mypage-profile__label">계정정보</h2>
            {loginType === 'email' ? (
              <p className="mypage-profile__value">email123@naver.com</p>
            ) : loginType === 'kakao' ? (
              <div className="flex items-center gap-[12px]">
                <Image className="w-[28px] h-[28px] rounded-full" src={kakao} alt="kakao" width={30} height={30} />
                <p>카카오 연동중</p>
              </div>
            ) : (
              <div className="flex items-center gap-[12px]">
                <Image className="w-[28px] h-[28px] rounded-full" src={naver} alt="naver" width={30} height={30} />
                <p>네이버 연동중</p>
              </div>
            )}
          </div>
          {loginType === 'email' && <button className="mypage-profile__button">비밀번호 변경</button>}
        </article>
        <button className="flex justify-end text-[14px] text-gray--500 hover:underline">회원탈퇴</button>
      </section>
    </main>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Post_Complete from '@/app/_components/_community/Post_complete';
import Script from 'next/script';
import info from '../../../../../public/image/info.svg';
import prev from '../../../../../public/image/prev.svg';
import profile from '../../../../../public/image/profile.jpg';
import selectArrow from '../../../../../public/image/selectArrow.svg';
import { useRouter } from 'next/navigation';

export default function UsedDetail() {
  const router = useRouter();
  const [isMyPostWritten, setIsMyPostWritten] = useState(true);
  const [isTrade, setIsTrade] = useState('거래');
  const infoWindowRef = useRef(null);

  const handlePrevButtonClick = () => {
    router.back();
  };

  // 더미 좌표 데이터 (실제 좌표로 교체 필요)
  const lat = 37.5665; // 위도
  const lng = 126.978; // 경도
  const initializeMap = () => {
    if (window.naver && window.naver.maps) {
      const location = new window.naver.maps.LatLng(lat, lng);
      // 지도 생성
      const map = new window.naver.maps.Map('map', {
        center: location,
        zoomControl: true, // 줌 설정
        zoom: 15,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      // 마커와 정보창 설정
      const marker = new window.naver.maps.Marker({
        map,
        position: location, // 마커 좌표
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: '<div style="padding:5px;">삼각지역 1번 출구</div>', // 표시할 텍스트
        borderWidth: 0,
      });

      infoWindowRef.current = infoWindow;

      window.naver.maps.Event.addListener(marker, 'click', function () {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    }
  };

  useEffect(() => {
    // 지도 초기화
    initializeMap();
  }, []);

  return (
    <main className="min-h-[750px] w-[1020px]">
      <div className="w-full flex">
        <section className="min-h-[750px] w-[730px] px-[24px] py-[40px] border-r">
          <div className="flex items-center justify-between">
            <Image
              className="w-[30px] h-[30px]"
              src={prev}
              alt="뒤로가기"
              width={30}
              height={30}
              onClick={handlePrevButtonClick}
            />
            <div className="w-[54px] py-[4px] bg-blue--500 text-white rounded-3xl flex justify-center">
              {isTrade ? '거래' : '나눔'}
            </div>
          </div>
          <article className="pl-[30px] pt-[24px]">
            <div className="flex justify-between items-center mb-[4px]">
              <div className="flex gap-[8px] items-center">
                <Image
                  className="w-[40px] h-[40px] rounded-full border"
                  src={profile}
                  alt="프로필"
                  width={40}
                  height={40}
                />
                <strong>한유진님의 게시글</strong>
              </div>
              <p className="text-xs text-gray--500">조회수 100</p>
            </div>
            <h1 className="text-2xl text-blue--500 font-bold">
              [사용감 적음!] 스탠드 선풍기🍃 팔아요
            </h1>
            <p className="inline-block min-h-[360px] mt-[24px]">
              본가로 돌아가게 돼서 사용하던 선풍기 팔아요 작년 여름에 구매했고,
              세척 한 번 한 상태입니다 원가 3만원인데 1만 5천원에 판매합니다
              채팅으로 연락주세요 네고는 안 받습니다
            </p>
            <div className="flex justify-between">
              <p className="text-xs text-gray--500">
                2024년 08월 07일 오후 09:07
              </p>
              <div className="flex gap-[16px]">
                {isMyPostWritten ? (
                  <>
                    <button className="text-sm text-gray--500">수정하기</button>
                    <button className="text-sm text-gray--500">삭제하기</button>
                  </>
                ) : (
                  <button className="text-sm text-gray--500">신고하기</button>
                )}
              </div>
            </div>
            <div className="border rounded-lg px-[32px] py-[16px] mt-[24px]">
              <div className="flex items-center gap-[4px] mb-[4px] pb-[4px] border-b-2 border-blue--500">
                <Image
                  className="w-[20px] h-[20px] rounded-full border"
                  src={profile}
                  alt="프로필"
                  width={20}
                  height={20}
                />
                <h2 className="font-bold">
                  한유진님의 최근 거래 완료글 (48개)
                </h2>
              </div>
              <div className="flex flex-col gap-[8px] mt-[12px]">
                <Post_Complete />
                <Post_Complete />
                <Post_Complete />
                <Post_Complete />
                <Post_Complete />
              </div>
            </div>
          </article>
        </section>
        <section className="w-[290px] h-[750px] fixed top-[158px] right-[440px] pl-[24px] py-[40px]">
          <div className="flex items-center gap-[8px]">
            <Image
              className="w-[30px] h-[30px]"
              src={info}
              alt="info"
              width={30}
              height={30}
            />
            <h2 className="text-2xl font-bold">상세 정보</h2>
          </div>
          <p className="text-xs text-gray--500">
            기재된 내용은 변동될 수 있습니다.
          </p>
          <div className="flex flex-col gap-[12px] mt-[16px] mb-[24px]">
            <div className="flex justify-between">
              <strong>판매 상품</strong>
              <p>스탠딩 선풍기</p>
            </div>
            <div className="flex justify-between">
              <strong>판매 가격</strong>
              <p>{isTrade ? '15,000원' : '나눔 상품'}</p>
            </div>
            <div className="flex justify-between">
              <strong>거래 희망 장소</strong>
              <p>삼각지역 1번 출구</p>
            </div>
            <div>
              <div
                className="border border-gray--200"
                id="map"
                style={{ width: '100%', height: '170px' }}
              ></div>
              <Script
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
                strategy="afterInteractive"
                onLoad={initializeMap}
              />
            </div>
            <div className="flex justify-between">
              <strong>진행 상태</strong>
              {isMyPostWritten ? (
                <div className="w-[130px] relative">
                  <select className="select-no-arrow border w-[130px] px-[12px] py-[4px] rounded-lg outline-none">
                    <option>{isTrade ? '거래' : '나눔'} 대기중</option>
                    <option>예약중</option>
                    <option>{isTrade ? '거래' : '나눔'} 완료</option>
                  </select>
                  <Image
                    className="w-[12px] h-[6px] absolute top-[14px] right-[8px] cursor-pointer pointer-events-none"
                    src={selectArrow}
                    alt="arrow"
                    width={12}
                    height={6}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <p>{isTrade ? '거래' : '나눔'} 대기중</p>
              )}
            </div>
          </div>
          <button className="w-full rounded-lg py-[12px] text-white font-bold bg-blue--500">
            채팅방으로 이동
          </button>
        </section>
      </div>
    </main>
  );
}

'use client';

import '@/styles/community.css';
import '@/styles/globals.css';

import { useEffect, useRef } from 'react';

import Script from 'next/script';

export default function LandingMap({ index }) {
  const infoWindowRef = useRef(null);
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
    <>
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
    </>
  );
}

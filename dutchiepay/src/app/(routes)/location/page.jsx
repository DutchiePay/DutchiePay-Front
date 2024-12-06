'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Script from 'next/script';

export default function Location_Modal({ onLocationUpdate }) {
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.978 });
  const [locationDescription, setLocationDescription] = useState('');

  const initializeMap = useCallback(() => {
    if (window.naver && window.naver.maps) {
      const mapLocation = new window.naver.maps.LatLng(
        location.lat,
        location.lng
      );

      const map = new window.naver.maps.Map('map', {
        center: mapLocation,
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      const marker = new window.naver.maps.Marker({
        position: mapLocation,
        map: map,
      });

      markerRef.current = marker;

      window.naver.maps.Event.addListener(map, 'click', function (e) {
        const newLocation = e.coord;
        marker.setPosition(newLocation);
        setLocation({
          lat: newLocation.lat(),
          lng: newLocation.lng(),
        });
      });
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    initializeMap();
  }, [location, initializeMap]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationUpdate(locationDescription);
  };

  return (
    <article className="max-w-[600px] p-[32px] overflow-x-hidden border b-black m-0 m-auto">
      <h1 className="text-3xl font-bold">거래 진행 위치 설정</h1>
      <p className="text-xs mt-[4px]">
        거래를 원하는 위치를 클릭하시면 마크가 이동합니다.
      </p>
      <p className="text-xs text-gray--500 mt-[12px]">
        ※ 추천 거래 진행 위치
        <br />
        마트의 경우 - 구매를 진행할 마트 위치 등<br />
        배달의 경우 - 배달 시킨 음식을 나눌 장소, 배달 시킬 장소 등<br />
      </p>

      <section className="mt-[24px]">
        <form onSubmit={handleSubmit}>
          <div>
            <div
              className="border border-gray--200 w-full h-[300px]"
              id="map"
            ></div>
            <Script
              src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
              strategy="afterInteractive"
              onLoad={initializeMap}
            />
          </div>

          <input
            className="w-full mt-[20px] text-sm border p-[12px] outline-none resize-none rounded"
            type="text"
            placeholder="해당 위치 이름 또는 설명을 적어주세요. (ex) 삼각지역 1번출구)"
            value={locationDescription}
            onChange={(e) => setLocationDescription(e.target.value)}
          />

          <div className="flex justify-center mt-[36px]">
            <button
              type="submit"
              className="w-[170px] text-white text-sm bg-blue-500 rounded-lg px-[24px] py-[8px]"
            >
              위치 설정
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}

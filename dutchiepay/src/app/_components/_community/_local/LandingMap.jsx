'use client';

import { useCallback, useEffect, useRef } from 'react';

import Script from 'next/script';

export default function LandingMap({ lat, lng, meetingPlace }) {
  const infoWindowRef = useRef(null);

  const initializeMap = useCallback(() => {
    if (window.naver && window.naver.maps) {
      const location = new window.naver.maps.LatLng(lat, lng);
      const map = new window.naver.maps.Map('map', {
        center: location,
        zoomControl: true,
        zoom: 15,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      const marker = new window.naver.maps.Marker({
        map,
        position: location,
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:5px;">${meetingPlace}</div>`,
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
  }, [lat, lng, meetingPlace]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return (
    <>
      <div className="w-full h-[170px] border border-gray--200" id="map"></div>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initializeMap}
      />
    </>
  );
}

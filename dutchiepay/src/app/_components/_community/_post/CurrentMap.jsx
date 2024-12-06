import { useCallback, useEffect, useRef } from 'react';

import Script from 'next/script';

export default function CurrentMap({ location, setLocation }) {
  const markerRef = useRef(null);

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
  }, [location, setLocation]);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    }
  }, [setLocation]);

  useEffect(() => {
    if (!location.lat && !location.lng) getCurrentLocation();
  }, [getCurrentLocation, location]);

  useEffect(() => {
    initializeMap();
  }, [location, initializeMap]);

  return (
    <div>
      <div className="border border-gray--200 w-full h-[300px]" id="map"></div>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={initializeMap}
      />
    </div>
  );
}

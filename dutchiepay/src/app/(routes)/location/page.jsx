import { useEffect, useRef, useState } from 'react';

import CryptoJS from 'crypto-js';
import Script from 'next/script';
import axios from 'axios';

export default function Location_Modal({ onLocationUpdate }) {
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.978 });
  const [locationDescription, setLocationDescription] = useState('');
  const [clientIp, setClientIp] = useState('');

  const generateSignature = (method, url, timestamp, accessKey, secretKey) => {
    const message = [method, url, '\n', timestamp, '\n', accessKey].join('');
    const hmac = CryptoJS.HmacSHA256(message, secretKey);
    return CryptoJS.enc.Base64.stringify(hmac);
  };

  const fetchClientIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setClientIp(response.data.ip);
    } catch (error) {
      console.error('IP 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const getCurrentLocationFromIP = async () => {
    const method = 'GET';
    const url = `/geolocation/v2/geoLocation?ip=${clientIp}&ext=t&enc=utf8&responseFormatType=json`;
    const timestamp = String(Date.now());
    const accessKey = process.env.NEXT_PUBLIC_NCP_ACCESS_KEY;
    const secretKey = process.env.NEXT_PUBLIC_NCP_SECRET_KEY;

    const signature = generateSignature(
      method,
      url,
      timestamp,
      accessKey,
      secretKey
    );

    if (!signature) {
      console.error('시그니처 생성에 실패했습니다.');
      return;
    }

    try {
      const response = await axios.get(
        `https://geolocation.apigw.ntruss.com${url}`,
        {
          headers: {
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-signature-v2': signature,
          },
        }
      );

      const data = response.data;

      if (data.returnCode === '0') {
        const { lat, long } = data.geoLocation;
        setLocation({ lat, lng: long });
      } else {
        console.error('위치 정보를 가져오지 못했습니다:', data.returnCode);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  const initializeMap = () => {
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
  };

  useEffect(() => {
    fetchClientIp();
  }, []);

  useEffect(() => {
    if (clientIp) {
      getCurrentLocationFromIP();
    }
  }, [clientIp]);

  useEffect(() => {
    initializeMap();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationUpdate(locationDescription);
  };

  return (
    <article className="max-w-[600px] p-[32px] overflow-x-hidden border b-black m-0 m-auto">
      <h1 className="text-3xl font-bold">거래 진행 위치 설정</h1>
      <p className="text-xs font-bold mt-[8px]">
        거래를 원하는 위치로 마커를 이동시켜주세요. 위치 설정 후에 게시글을
        작성하실 수 있습니다.
      </p>
      <p className="text-xs text-gray--500 mt-[16px]">
        ※ 추천 거래 진행 위치
        <br />
        마트의 경우 - 구매를 진행할 마트 위치나 구매한 상품을 분배하는 특정 장소
        등<br />
        배달의 경우 - 배달 시킨 음식을 나눌 장소 등<br />
        나눔/배달의 경우 - 거래를 진행할 장소
      </p>

      <section className="mt-[40px]">
        <form onSubmit={handleSubmit}>
          <div>
            <div
              className="border border-gray--200"
              id="map"
              style={{ width: '100%', height: '300px' }}
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

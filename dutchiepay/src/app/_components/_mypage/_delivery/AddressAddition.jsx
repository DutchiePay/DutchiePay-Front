'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useEffect } from 'react';

export default function AddressAddition({ deliveryAddress, setIsChanged }) {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (
        event.data &&
        (event.data.type === 'ADD_ADDRESS' ||
          event.data.type === 'UPDATE_ADDRESS')
      ) {
        setIsChanged(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <button
      className="w-[150px] mt-[24px] px-[24px] py-[8px] bg-blue--500 text-white text-sm flex justify-between rounded block mx-auto"
      onClick={() => {
        if (!deliveryAddress || deliveryAddress.length < 5) {
          window.open(
            '/delivery-address',
            '주소지 추가',
            'width=620, height=670, location=1'
          );
        } else {
          alert('최대 5개까지의 주소지를 저장할 수 있습니다.');
        }
      }}
    >
      주소지 추가<p>+</p>
    </button>
  );
}

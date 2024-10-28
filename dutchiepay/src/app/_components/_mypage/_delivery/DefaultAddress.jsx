'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DefaultAddress({ deliveryAddress, setIsChanged }) {
  const access = useSelector((state) => state.login.access);

  const handleDefaultUpdate = async () => {
    if (
      confirm(
        '해당 주소지를 기본 배송지로 설정하시겠습니까?\n기존의 기본 배송지는 일반 배송지로 변경됩니다.'
      )
    ) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,
          { ...deliveryAddress, isDefault: true },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setIsChanged(true);
        alert('기본 배송지로 변경되었습니다.');
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      {deliveryAddress.isDefault ? (
        <p className="flex justify-center w-[30px] h-[18px] border border-blue--500 text-blue--500 text-xs">
          기본
        </p>
      ) : (
        <button
          className="text-gray--500 text-xs font-medium hover:underline"
          onClick={handleDefaultUpdate}
        >
          기본 배송지로 설정
        </button>
      )}
    </>
  );
}

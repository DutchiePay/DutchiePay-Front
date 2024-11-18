'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import DefaultAddress from './DefaultAddress';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function DeliveryAddressItem({
  deliveryAddress,
  setIsChanged,
  isFirst,
}) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const handleDelete = async () => {
    if (confirm('주소지를 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery?addressid=${deliveryAddress.addressId}`,

          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setIsChanged(true);

        alert('정상적으로 삭제되었습니다.');
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await handleDelete();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <div className={`${isFirst ? 'border-y' : 'border-b'} px-[12px] py-[8px]`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <strong className="text-lg">{deliveryAddress.addressName}</strong>
          <DefaultAddress
            deliveryAddress={deliveryAddress}
            setIsChanged={setIsChanged}
          />
        </div>
        <div className="flex gap-[12px] items-center text-sm text-gray--500">
          <button
            className="hover:underline"
            onClick={() => {
              window.open(
                `/delivery-address?addressid=${deliveryAddress.addressId}`,
                '주소지 수정',
                'width=620, height=670, location=1'
              );
            }}
          >
            수정
          </button>
          <button className="hover:underline" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      <div className="flex gap-[12px]">
        <p>{deliveryAddress.name}</p>
        <p className="text-gray--500">{deliveryAddress.phone}</p>
      </div>
      <p className="flex gap-[8px] items-center">
        {deliveryAddress.address} <span>({deliveryAddress.zipCode})</span>
      </p>
      <p>{deliveryAddress.detail}</p>
    </div>
  );
}

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Link from 'next/link';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function DeliveryAddressItem({ deliveryAddress, isFirst }) {
  const access = useSelector((state) => state.login.access);

  const handleDelete = async () => {
    if (confirm('주소지를 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/address`,
          { addressId: deliveryAddress.addressId },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        // 주소지 삭제 처리 코드 추가
        alert('정상적으로 삭제되었습니다.');
      } catch (error) {
        //에러 처리
      }
    }
  };
  return (
    <div className={`${isFirst ? 'border-y' : 'border-b'} px-[12px] py-[8px]`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <strong className="text-lg">{deliveryAddress.addressName}</strong>
          {deliveryAddress.isDefault && (
            <p className="flex justify-center w-[30px] h-[18px] border border-blue--500 text-blue--500 text-xs">
              기본
            </p>
          )}
        </div>
        <div className="flex gap-[12px] items-center text-sm text-gray--500">
          <button
            className="hover:underline"
            onClick={() => {
              window.open(
                `/delivery-address?addressid=${deliveryAddress.addressId}`,
                '주소지 추가',
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
        {deliveryAddress.address} <p>({deliveryAddress.zipcode})</p>
      </p>
      <p>{deliveryAddress.detail}</p>
    </div>
  );
}

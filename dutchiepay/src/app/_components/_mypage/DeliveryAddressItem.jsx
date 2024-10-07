'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useDispatch, useSelector } from 'react-redux';

import CryptoJS from 'crypto-js';
import Link from 'next/link';
import axios from 'axios';
import { setAddresses } from '@/redux/slice/addressSlice';

export default function DeliveryAddressItem({
  deliveryAddress,
  setDeliveryAddress,
  isFirst,
}) {
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (confirm('주소지를 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,

          {
            data: { addressId: deliveryAddress.addressId },
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setDeliveryAddress((prev) =>
          prev.filter(
            (address) => address.addressId !== deliveryAddress.addressId
          )
        );
        const encryptData = CryptoJS.AES.encrypt(
          JSON.stringify(deliveryAddress),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();
        dispatch(setAddresses(encryptData));

        alert('정상적으로 삭제되었습니다.');
      } catch (error) {
        //에러 처리
        console.log(error);
      }
    }
  };

  const handleUpdate = () => {
    const popup = window.open(
      `/delivery-address?addressid=${deliveryAddress.addressId}`,
      '주소지 수정',
      'width=620, height=670, location=1'
    );

    popup.onload = () => {
      popup.postMessage(
        { type: 'PASS_ADDRESS', ...deliveryAddress },
        window.location.origin
      );
    };
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
          <button className="hover:underline" onClick={handleUpdate}>
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
        {deliveryAddress.address} <p>({deliveryAddress.zipCode})</p>
      </p>
      <p>{deliveryAddress.detail}</p>
    </div>
  );
}

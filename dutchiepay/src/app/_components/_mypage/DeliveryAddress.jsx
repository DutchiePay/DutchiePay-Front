'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import DeliveryAddressItem from './DeliveryAddressItem';
import Image from 'next/image';
import axios from 'axios';
import delivery from '../../../../public/image/delivery.svg';
import { setAddresses } from '@/redux/slice/addressSlice';

export default function DeliveryAddress() {
  const encryptedAddresses = useSelector((state) => state.address.addresses);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const access = useSelector((state) => state.login.access);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const initMypage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        console.log(response.data);
        setDeliveryAddress(response.data);
        const encryptData = CryptoJS.AES.encrypt(
          JSON.stringify(response.data),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();
        dispatch(setAddresses(encryptData));
      } catch (error) {
        console.log(error);
      }
    };

    if (!encryptedAddresses) initMypage();
    else {
      setDeliveryAddress(
        JSON.parse(
          CryptoJS.AES.decrypt(
            encryptedAddresses,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        )
      );
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data) {
        const { type, ...addressData } = event.data;

        if (type === 'ADD_ADDRESS') {
          setDeliveryAddress((prev) => {
            const updatedAddress = [...prev, addressData];

            const encryptData = CryptoJS.AES.encrypt(
              JSON.stringify(updatedAddress),
              process.env.NEXT_PUBLIC_SECRET_KEY
            ).toString();
            dispatch(setAddresses(encryptData));

            return updatedAddress;
          });
        } else if (type === 'UPDATE_ADDRESS') {
          setDeliveryAddress((prev) => {
            const updatedAddress = prev.map((address) =>
              address.id === addressData.id ? addressData : address
            );

            const encryptData = CryptoJS.AES.encrypt(
              JSON.stringify(updatedAddress),
              process.env.NEXT_PUBLIC_SECRET_KEY
            ).toString();
            dispatch(setAddresses(encryptData));

            return updatedAddress;
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <article>
      <h2 className="font-semibold text-2xl">배송지 관리</h2>
      {!deliveryAddress || deliveryAddress.length === 0 ? (
        <div className="mt-[40px] flex flex-col justify-center items-center">
          <Image
            className="opacity-50"
            src={delivery}
            alt="delivery-icon"
            width={100}
            height={100}
          />
          <strong className="mt-[8px] text-xl">
            설정한 배송지가 없습니다.
          </strong>
          <p className="text-sm text-gray--500">
            자주 사용하는 배송지를 추가해 편리하게 공동구매를 이용하실 수
            있습니다.
          </p>
        </div>
      ) : (
        <div className="mt-[32px]">
          {deliveryAddress.map((item, index) => (
            <DeliveryAddressItem
              key={index}
              deliveryAddress={item}
              setDeliveryAddress={setDeliveryAddress}
              isFirst={index === 0}
            />
          ))}
        </div>
      )}
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
    </article>
  );
}

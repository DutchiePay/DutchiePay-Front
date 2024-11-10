import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import axios from 'axios';
import { setAddresses } from '@/redux/slice/addressSlice';
import useRetryFunction from './useRetryFunction';

export default function useFetchDelivery() {
  const encryptedAddresses = useSelector((state) => state.address.addresses);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  useEffect(() => {
    const channel = new BroadcastChannel('auth-channel');

    const fetchDelivery = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setDeliveryAddress(response.data);
        const encryptData = CryptoJS.AES.encrypt(
          JSON.stringify(response.data),
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();
        if (isChanged) {
          channel.postMessage({ type: 'change-address', data: encryptData });
        }
        dispatch(setAddresses(encryptData));
        setIsChanged(false);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          // 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
          reissueTokenAndRetry(() => fetchDelivery());
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    if (!encryptedAddresses || isChanged) {
      fetchDelivery();
    } else {
      setDeliveryAddress(
        JSON.parse(
          CryptoJS.AES.decrypt(
            encryptedAddresses,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        )
      );
    }

    return () => {
      channel.close();
    };
  }, [isChanged, access, encryptedAddresses, dispatch]);

  return { deliveryAddress, setIsChanged };
}

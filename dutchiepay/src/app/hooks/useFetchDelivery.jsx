import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import axios from 'axios';
import { setAddresses } from '@/redux/slice/addressSlice';

export default function useFetchDelivery() {
  const encryptedAddresses = useSelector((state) => state.address.addresses);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
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
        dispatch(setAddresses(encryptData));
        setIsChanged(false);
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
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
  }, [isChanged, access, encryptedAddresses, dispatch]);

  return { deliveryAddress, setIsChanged };
}

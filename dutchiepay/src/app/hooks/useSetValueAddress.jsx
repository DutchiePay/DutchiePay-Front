import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import { useSelector } from 'react-redux';

const useSetValueAddress = (addressId, setValue) => {
  const encryptedAddresses = useSelector((state) => state.address.addresses);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  useEffect(() => {
    const fetchAddress = () => {
      try {
        const decrypted = JSON.parse(
          CryptoJS.AES.decrypt(
            encryptedAddresses,
            process.env.NEXT_PUBLIC_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        );

        const findAddress = decrypted.find(
          (address) => address.addressId === Number(addressId)
        );

        if (findAddress) {
          setValue('addressName', findAddress.addressName);
          setValue('name', findAddress.name);
          setValue('phone', findAddress.phone);
          setValue('zipCode', findAddress.zipCode);
          setValue('address', findAddress.address);
          setValue('detail', findAddress.detail);
          setValue('isDefault', findAddress.isDefault);

          setIsDefaultAddress(findAddress.isDefault);
        }
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (addressId) {
      fetchAddress();
    }
  }, [addressId, encryptedAddresses, setValue]);

  return isDefaultAddress;
};

export default useSetValueAddress;

'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import AddressFilter from './AddressFilter';
import AddressInput from './AddressInput';
import DeliveryMessage from './DeliveryMessage';
import OrdererInput from './OrdererInput';
import useFetchDelivery from '@/app/hooks/useFetchDelivery';

export default function Orderer({ register, setValue }) {
  const [selectedAddress, setSelectedAddress] = useState(null); // 선택한 배송지
  const { deliveryAddress } = useFetchDelivery();

  useEffect(() => {
    if (deliveryAddress && deliveryAddress.length > 0) {
      const defaultAddress = deliveryAddress.find(
        (address) => address.isDefault === true
      );
      setSelectedAddress(
        defaultAddress
          ? defaultAddress.addressName
          : deliveryAddress[0].addressName
      );
    }
  }, [deliveryAddress]);

  useEffect(() => {
    if (selectedAddress && selectedAddress !== '직접입력') {
      const address = deliveryAddress.find(
        (item) => item.addressName === selectedAddress
      );
      if (address) {
        setValue('zipCode', address.zipCode);
        setValue('address', address.address);
        setValue('detail', address.detail);
        setValue('recipient', address.name);
        setValue('phone', address.phone);
      }
    } else {
      setValue('zipCode', '');
      setValue('address', '');
      setValue('detail', '');
      setValue('recipient', '');
      setValue('phone', '');
    }
  }, [selectedAddress, deliveryAddress, setValue]);

  return (
    <>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">주문자 정보</h2>
        <AddressFilter
          deliveryAddress={deliveryAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      </div>

      <table className="w-full border border-collapse">
        <tbody>
          <OrdererInput register={register} />
          <AddressInput register={register} setValue={setValue} />
          <DeliveryMessage register={register} />
        </tbody>
      </table>
    </>
  );
}

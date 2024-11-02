'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import selectArrow from '/public/image/selectArrow.svg';
import useFetchDelivery from '@/app/hooks/useFetchDelivery';
import { useForm } from 'react-hook-form';
import useGetPostCode from '@/app/hooks/useGetPostCode';

export default function Orderer() {
  const { register, setValue } = useForm();
  const [isSelfMessage, setIsSelfMessage] = useState(false); // 배송 메시지 직접 입력 여부
  const [selectedAddress, setSelectedAddress] = useState(null); // 선택한 배송지
  const getPostCode = useGetPostCode(setValue);
  const { deliveryAddress } = useFetchDelivery();

  useEffect(() => {
    if (deliveryAddress && deliveryAddress.length > 0) {
      setSelectedAddress(deliveryAddress[0].addressName);
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

  const handlePostCode = async () => {
    try {
      await getPostCode();
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form className="flex flex-col gap-[8px]">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">주문자 정보</h2>
        {deliveryAddress && deliveryAddress.length !== 0 && (
          <ul className="flex gap-[8px] text-xs font-medium">
            {deliveryAddress.map((item, key) => (
              <li
                className={`hover:text-blue--500 ${selectedAddress === item.addressName ? 'text-blue--500' : ''}`}
                key={key}
                onClick={() => setSelectedAddress(item.addressName)}
              >
                {item.addressName}
              </li>
            ))}
            <li
              className={`text-gray--500 hover:text-blue--500 ${selectedAddress === '직접입력' ? '!text-blue--500' : ''}`}
              onClick={() => setSelectedAddress('직접입력')}
            >
              직접입력
            </li>
          </ul>
        )}
      </div>

      <table className="border border-collapse">
        <tbody>
          <tr className="border h-[60px]">
            <th className="w-[120px] bg-gray--100">받는분</th>
            <td className="px-[16px]">
              <input
                {...register('recipient')}
                className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                placeholder="받는분"
              />
            </td>
          </tr>
          <tr className="border h-[60px]">
            <th className="w-[120px] bg-gray--100">연락처</th>
            <td className="px-[16px]">
              <input
                {...register('phone')}
                className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                placeholder="전화번호(ex) 01012345678)"
              />
            </td>
          </tr>
          <tr className="border h-[140px]">
            <th className="w-[120px] bg-gray--100">주소</th>
            <td className="px-[16px]">
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[8px]">
                  <input
                    {...register('zipCode')}
                    className="w-[70px] border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                    placeholder="우편번호"
                  />
                  <button
                    className="h-[28px] px-[8px] text-white text-sm bg-blue--500 rounded-lg"
                    onClick={handlePostCode}
                    type="button"
                  >
                    주소 검색
                  </button>
                </div>
                <input
                  {...register('address')}
                  className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                  placeholder="주소"
                />
                <input
                  {...register('detail')}
                  className="w-[300px] border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                  placeholder="상세 주소"
                />
              </div>
            </td>
          </tr>
          <tr className={`border ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}>
            <th className="w-[120px] bg-gray--100">배송메시지</th>
            <td
              className={`flex flex-col justify-center gap-[8px] px-[16px] ${isSelfMessage ? 'h-[100px]' : 'h-[80px]'}`}
            >
              <div className="w-[400px] relative">
                <select
                  {...register('deliveryMessage')}
                  className="select-no-arrow w-[400px] px-[8px] py-[6px] text-sm border rounded-lg outline-none"
                  onChange={(e) =>
                    setIsSelfMessage(e.target.value === 'option5')
                  }
                >
                  <option value="">배송메시지를 선택해주세요.</option>
                  <option value="option1">문 앞에 놓아 주시면 돼요.</option>
                  <option value="option2">직접 받을게요. (부재시 문 앞)</option>
                  <option value="option3">벨 누르지 말아주세요.</option>
                  <option value="option4">배송 전에 미리 연락주세요.</option>
                  <option value="option5">직접 입력하기</option>
                </select>
                <Image
                  className="w-[12px] h-[6px] absolute top-[12px] right-[10px] cursor-pointer pointer-events-none"
                  src={selectArrow}
                  alt="arrow"
                  width={12}
                  height={6}
                  aria-hidden="true"
                />
              </div>
              {isSelfMessage && (
                <input
                  {...register('customMessage')}
                  className="w-full border rounded-lg px-[8px] py-[6px] text-sm outline-none"
                  placeholder="배송메시지"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

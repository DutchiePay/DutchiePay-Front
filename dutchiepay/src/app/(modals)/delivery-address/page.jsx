'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Address() {
  const searchParams = useSearchParams();
  const open = useDaumPostcodePopup();
  const addressId = searchParams.get('addressid'); // 해당 값이 존재하면 수정, 존재하지 않으면 추가
  const access = useSelector((state) => state.login.access);
  const encryptedAddresses = useSelector((state) => state.address.addresses);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false); // 수정 요청 주소지가 기본 배송지였을 경우 true

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  useEffect(() => {
    const fetchAddress = () => {
      const decrypted = JSON.parse(
        CryptoJS.AES.decrypt(
          encryptedAddresses,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      );

      const findAddress = decrypted.find(
        (address) => address.addressId === Number(addressId)
      );
      setValue('addressName', findAddress.addressName);
      setValue('name', findAddress.name);
      setValue('phone', findAddress.phone);
      setValue('zipCode', findAddress.zipCode);
      setValue('address', findAddress.address);
      setValue('detail', findAddress.detail);
      setValue('isDefault', findAddress.isDefault);

      setIsDefaultAddress(findAddress.isDefault);
    };

    if (addressId) fetchAddress();
  }, [addressId]);

  const onError = () => {
    alert('상세주소 외에 모든 내용은 필수 값입니다.');
  };

  const onSubmit = async (formData) => {
    if (addressId) {
      try {
        if (isDefaultAddress && !formData.isDefault) {
          if (
            confirm(
              '최소 1개의 기본 배송지를 가져야 합니다.\n확인 시 기본 배송지로 설정된 채로 수정됩니다.'
            )
          ) {
            formData.isDefault = true;
          } else return;
        }

        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,
          { addressId: addressId, ...formData },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        window.opener.postMessage(
          { type: 'UPDATE_ADDRESS' },
          window.location.origin
        );

        alert('주소지가 수정되었습니다.');
        closeWindow();
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/delivery`,
          { ...formData },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        window.opener.postMessage(
          { type: 'ADD_ADDRESS' },
          window.location.origin
        );

        alert('배송지가 추가되었습니다.');
        closeWindow();
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handlePostCode = () => {
    open({
      onComplete: (data) => {
        setValue('zipCode', data.zonecode);
        setValue('address', data.roadAddress);
      },
      width: 500,
      height: 600,
      left: window.innerWidth / 2 - 500 / 2,
      top: window.innerHeight / 2 - 600 / 2,
    });
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <section className="min-w-[620px] p-[32px]">
      <h1 className="text-3xl font-bold">
        주소지 {addressId ? '수정' : '추가'}
      </h1>
      <form
        className="mt-[40px] flex flex-col gap-[8px]"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          className="address__input"
          type="text"
          placeholder="배송지 이름"
          {...register('addressName', {
            required: '배송지 이름을 작성해주세요.',
          })}
        />
        <input
          className="address__input"
          type="text"
          placeholder="받는 사람"
          {...register('name', {
            required: '받는 사람의 이름을 입력해주세요.',
          })}
        />
        <input
          className="address__input"
          type="number"
          placeholder="전화번호"
          {...register('phone', {
            required: '전화번호를 입력해주세요,',
            pattern: {
              value: rPhone,
              message: '올바른 휴대폰 번호 형식을 입력해주세요',
            },
          })}
        />
        <div className="flex gap-[12px]">
          <input
            className="address__input"
            type="number"
            placeholder="우편번호"
            disabled
            {...register('zipCode', {
              required: '우편번호 찾기를 통해 주소를 입력해주세요.',
            })}
          />
          <button
            className="w-[200px] bg-blue--500 text-white rounded"
            onClick={handlePostCode}
            type="button"
          >
            우편번호 찾기
          </button>
        </div>
        <input
          className="address__input"
          type="text"
          placeholder="주소"
          disabled
          {...register('address', {
            required: '우편번호 찾기를 통해 주소를 입력해주세요.',
          })}
        />
        <input
          className="address__input"
          type="text"
          placeholder="상세주소"
          {...register('detail')}
        />
        <div className="flex items-center gap-[8px]">
          <input id="default" type="checkbox" {...register('isDefault')} />
          <label htmlFor="default" className="text-sm">
            기본배송지로 설정
          </label>
        </div>
        <div className="mt-[40px] flex gap-[12px] justify-center">
          <button
            className="bg-red-100 text-red-500 text-sm rounded-lg px-[24px] py-[8px]"
            type="submit"
          >
            {addressId ? '수정' : '추가'}
          </button>
          <button
            className="text-blue--500 text-sm border border-blue--200 rounded-lg px-[24px] py-[8px]"
            type="button"
            onClick={closeWindow}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}

'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import { useRouter, useSearchParams } from 'next/navigation';

import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Address() {
  const searchParams = useSearchParams();
  const open = useDaumPostcodePopup();
  const addressId = searchParams.get('addressid'); // 해당 값이 존재하면 수정, 존재하지 않으면 추가
  const [address, setAddress] = useState({
    addressId: addressId,
    addressName: null,
    name: null,
    phone: null,
    address: null,
    zipcode: null,
    detail: null,
    isDefault: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit = async (formData) => {
    if (addressId) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/address`,
          { addressId: addressId, ...formData },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        alert('주소지가 수정되었습니다.');
        closeWindow();
      } catch (error) {
        // 에러 처리
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/address`,
          { formData },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setAddress((prevState) => ({
          ...prevState,
          addressId: response.data.addressId,
        }));

        alert('배송지가 추가되었습니다.');
        closeWindow();
      } catch (error) {
        // 에러 처리
      }
    }
  };

  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const handlePostCode = (e) => {
    open({
      onComplete: (data) => {
        console.log(data);
        setAddress((prevState) => ({
          ...prevState,
          zipcode: data.zonecode,
          address: data.jibunAddress,
        }));
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
        className="mt-[40px] flex flex-col gap-[4px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="address__input"
          type="text"
          placeholder="배송지 이름"
          defaultValue={address.addressName}
          {...register('addressName', {
            required: '배송지 이름을 작성해주세요.',
          })}
        />
        <input
          className="address__input"
          type="text"
          placeholder="받는 사람"
          defaultValue={address.name}
          {...register('name', {
            required: '받는 사람의 이름을 입력해주세요.',
          })}
        />
        <input
          className="address__input"
          type="number"
          placeholder="전화번호"
          defaultValue={address.phone}
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
            defaultValue={address.zipcode}
            {...register('zipcode', {
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
          defaultValue={address.address}
          {...register('address', {
            required: '우편번호 찾기를 통해 주소를 입력해주세요.',
          })}
        />
        <input
          className="address__input"
          type="text"
          placeholder="상세주소"
          defaultValue={address.detail}
          {...register('detail')}
        />
        <div className="flex items-center gap-[8px]">
          <input
            type="checkbox"
            onChange={(e) =>
              setAddress((prevState) => ({
                ...prevState,
                isDefault: e.target.checked,
              }))
            }
          />
          <label className="text-sm">기본배송지로 설정</label>
        </div>
      </form>
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
    </section>
  );
}

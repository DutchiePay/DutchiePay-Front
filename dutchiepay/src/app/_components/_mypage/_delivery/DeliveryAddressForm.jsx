'use client';

import DeliveryAddressInput from './DeliveryAddressInput';
import PopUpButton from '../../PopUpButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';
import useSetValueAddress from '@/app/hooks/useSetValueAddress';

export default function DeliveryAddressForm({ addressId }) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });
  const isDefaultAddress = useSetValueAddress(addressId, setValue);

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
        window.close();
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            onSubmit(formData);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
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
        window.close();
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await onSubmit(formData);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <form
      className="mt-[40px] flex flex-col gap-[8px]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <DeliveryAddressInput setValue={setValue} register={register} />
      <PopUpButton submitText={addressId ? '수정' : '추가'} />
    </form>
  );
}

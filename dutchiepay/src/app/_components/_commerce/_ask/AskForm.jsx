'use client';

import AskRadioButton from './AskRadioButton';
import AskTextarea from './AskTextarea';
import PopUpButton from '../../PopUpButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function AskForm({ buyId }) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      isSecret: false,
    },
  });

  const onSubmit = async (formData) => {
    if (formData.content.trim() === '') {
      alert('내용을 작성하지 않을 경우, 문의를 등록할 수 없습니다.');
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/asks`,
        {
          buyId: buyId,
          content: formData.content,
          isSecret: formData.isSecret,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      alert('문의가 성공적으로 제출되었습니다.');
      window.opener.postMessage(
        { type: 'REFRESH_ASK' },
        window.location.origin
      );
      window.close();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await onSubmit(formData);
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert(
          error.response.data.message ||
            '오류가 발생했습니다 다시 시도해주세요.'
        );
      }
    }
  };

  return (
    <form className="mt-[12px]" onSubmit={handleSubmit(onSubmit)}>
      <AskTextarea register={register} />
      <AskRadioButton register={register} />
      <PopUpButton submitText={'문의하기'} />
    </form>
  );
}

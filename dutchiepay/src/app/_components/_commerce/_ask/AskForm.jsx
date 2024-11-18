'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import PopUpButton from '../../PopUpButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function AskForm({ buyId }) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      isSecret: false, // 기본값을 false로 설정
    },
  });

  const closeWindow = () => {
    window.close();
  };

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
          isSecret: Boolean(formData.isSecret),
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
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <form className="mt-[12px]" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-blue--500 font-semibold">문의 내용</p>
      <textarea
        className="w-full h-[300px] mt-[8px] border border-blue--500 rounded p-[12px] resize-none product-ask-textarea outline-none"
        placeholder="문의 사항을 작성해주세요."
        {...register('content')}
      />

      <div className="flex items-center gap-[8px] mt-[8px]">
        <p className="mr-[8px] text-blue--500 font-semibold">공개 설정</p>
        <input
          id="all"
          type="radio"
          value={false}
          defaultChecked
          {...register('isSecret')}
        />
        <label className="text-sm text-gray--500 mr-[8px]" htmlFor="all">
          전체 공개
        </label>
        <input
          id="secret"
          type="radio"
          value={true}
          {...register('isSecret')}
        />
        <label className="text-sm text-gray--500" htmlFor="secret">
          비공개
        </label>
      </div>

      <PopUpButton submitText={'문의하기'} />
    </form>
  );
}

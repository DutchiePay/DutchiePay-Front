'use client';

import CommentInput from './CommentInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function CommentSubmit({ postId, refreshComments }) {
  const { refreshAccessToken } = useReissueToken();
  const { register, watch, handleSubmit, setValue } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });
  const access = useSelector((state) => state.login.access);

  const onSubmit = async (formData) => {
    setValue('comment', '');

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments`,
        {
          freeId: postId,
          rootCommentId: null,
          mentionedId: null,
          content: formData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('댓글이 성공적으로 등록되었습니다.');
      refreshComments();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await onSubmit();
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-[8px] flex gap-[8px]">
      <CommentInput register={register} setValue={setValue} watch={watch} />
    </form>
  );
}

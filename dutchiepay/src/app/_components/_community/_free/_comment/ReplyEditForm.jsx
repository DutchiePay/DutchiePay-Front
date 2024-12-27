'use client';

import React, { useEffect } from 'react';

import CommentInput from './CommentInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function ReplyEditForm({
  commentId,
  item,
  setIsEdit,
  refreshComments,
  reply = null,
}) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  useEffect(() => {
    setValue('comment', item.contents);
  }, [item.contents, setValue]);

  const handleReplySubmit = async (formData) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments`,
        {
          commentId: commentId,
          content: formData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('댓글이 성공적으로 수정되었습니다.');
      setIsEdit(false);
      refreshComments();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleReplySubmit(formData);
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
    <form
      onSubmit={handleSubmit(handleReplySubmit)}
      className={`ml-[8px] ${reply ? 'w-[495px]' : 'w-[590px]'}`}
    >
      <CommentInput
        register={register}
        setValue={setValue}
        watch={watch}
        isEdit={true}
      />
    </form>
  );
}

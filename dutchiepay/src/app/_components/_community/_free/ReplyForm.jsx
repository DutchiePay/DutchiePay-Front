'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import PostCommentAction from './PostCommentAction';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useReissueToken from '@/app/hooks/useReissueToken';

const ReplyForm = ({
  mentionedNickname,
  mentionedId,
  postId,
  rootCommentId,
  refreshComments,
}) => {
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const access = useSelector((state) => state.login.access);
  const comment = watch('comment', '');
  const { refreshAccessToken } = useReissueToken();

  const handleReplySubmit = async (formData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/free/comments`,
        {
          freeId: postId,
          content: formData.comment,
          rootCommentId: rootCommentId,
          mentionedId: mentionedId,
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
      if (error.response?.data?.message === '액세스 토큰이 만료되었습니다.') {
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
    <form onSubmit={handleSubmit(handleReplySubmit)} className="w-full">
      {mentionedNickname && (
        <span className="text-blue--500 font-bold mr-[5px] bg-gray--100 p-1">
          @{mentionedNickname}
        </span>
      )}
      <textarea
        id="comment"
        {...register('comment')}
        className="w-full resize-none outline-none text-sm p-2 min-h-[100px]"
        placeholder="답글을 입력해주세요."
        spellCheck="false"
        maxLength={800}
        onInput={(e) => {
          const text = e.target.value;
          if (text.length > 800) {
            e.target.value = text.substring(0, 800);
            setValue('comment', e.target.value);
          } else {
            setValue('comment', text);
          }
        }}
      />
      <PostCommentAction comment={comment} />
    </form>
  );
};

export default ReplyForm;

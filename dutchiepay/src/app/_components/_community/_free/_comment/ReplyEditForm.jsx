'use client';

import React, { useEffect } from 'react';

import PostCommentAction from './PostCommentAction';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

const ReplyEditForm = ({
  commentId,
  item,
  setIsEdit,
  mentionedNickname,
  refreshComments,
  reply = null,
}) => {
  const edit = true;
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

  const access = useSelector((state) => state.login.access);
  const comment = watch('comment', '');
  const { refreshAccessToken } = useReissueToken();
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
      className={`${reply ? 'w-[474px]' : 'w-full'}`}
    >
      {mentionedNickname && (
        <span className="text-blue--500 font-bold mr-[5px] bg-gray--100 p-1">
          @{mentionedNickname}
        </span>
      )}
      <textarea
        id="comment"
        {...register('comment')}
        className={`resize-none outline-none text-sm p-2 min-h-[100px] ${reply ? 'w-[474px]' : 'w-full'}`}
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
      <PostCommentAction comment={comment} edit={edit} setIsEdit={setIsEdit} />
    </form>
  );
};

export default ReplyEditForm;

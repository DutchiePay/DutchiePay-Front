'use client';

import '@/styles/globals.css';

import PostCommentAction from './PostCommentAction';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function CommentWrite({ postId, refreshComments }) {
  const { refreshAccessToken } = useReissueToken();
  const { register, watch, handleSubmit, setValue } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });
  const access = useSelector((state) => state.login.access);
  const comment = watch('comment', '');

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col border border-gray--300 rounded-lg p-2 bg-white">
        <textarea
          id="comment"
          {...register('comment')}
          className="w-full resize-none outline-none text-sm p-2 min-h-[100px]"
          placeholder="댓글을 입력해주세요."
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
      </div>
    </form>
  );
}

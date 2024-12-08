'use client';

import '@/styles/globals.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import PostCommentAction from './PostCommentAction';

export default function Reply() {
  const [isReplyActive, setIsReplyActive] = useState(false); // 답글 활성화
  const [isModified, setIsModified] = useState(false); // 댓글 수정 여부
  const [commenterName, setCommenterName] = useState('한유진'); // 댓글 단 사람 이름
  const { refreshAccessToken } = useReissueToken();
  const { register, watch, setValue, handleSubmit } = useForm({
    mode: 'onTouched',
    criteriaMode: 'all',
    reValidateMode: 'onblur',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const comment = watch('comment', '');

  const onSubmit = async (formData) => {};

  return (
    <div className="py-[16px]">
      <div className="flex items-start">
        <Image
          className="mt-[8px]"
          src={reply}
          alt="reply"
          width={20}
          height={20}
        />
        <Image
          className="border rounded-full ml-[8px]"
          src={profile}
          alt="profile"
          width={50}
          height={50}
        />
        <div className="w-full">
          <div className="w-full px-[12px] py-[4px] flex justify-between items-center">
            <div className="flex gap-[8px] items-center">
              <strong className="text-sm text-blue--500">
                {commenterName}
              </strong>
              <p className="text-xs text-gray--500">
                2024. 08. 02. 20:26{isModified && ' (수정됨)'}
              </p>
            </div>
            <button
              className="font-bold text-xs"
              onClick={() => setIsReplyActive(!isReplyActive)}
            >
              답글
            </button>
          </div>
          <p className="text-sm px-[12px]">
            팁은 정말 귀중합니다. 앞으로 더 많은 팁 기대할게요!
          </p>
        </div>
      </div>
      {isReplyActive && (
        <div className="mt-[30px] flex gap-[8px] items-start">
          <Image
            className="mt-[8px]"
            src={reply}
            alt="reply"
            width={20}
            height={20}
          />
          <Image
            className="w-[50px] h-[50px] border rounded-full"
            src={profile}
            alt="profile"
            width={50}
            height={50}
          />
          <div className="w-[500px] ml-1 border border-gray--300 rounded-lg p-3 text-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <span className="text-blue--500 font-bold mr-[5px] bg-gray--100 p-1">
                @{commenterName}
              </span>
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
          </div>
        </div>
      )}
    </div>
  );
}

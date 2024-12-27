'use client';

import Image from 'next/image';
import PostCommentAction from './PostCommentAction';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';

export default function CommentInput({ register, watch, setValue }) {
  const profileImage = useSelector((state) => state.login.user.profileImage);
  const comment = watch('comment', '');

  return (
    <>
      <div className="relative w-[50px] h-[50px] rounded-full border">
        <Image
          className="w-[50px] h-[50px] rounded-full object-cover"
          src={profileImage || profile}
          alt="프로필"
          fill
        />
      </div>
      <div className="flex flex-col grow border border-gray--300 rounded-lg p-2 bg-white">
        <textarea
          id="comment"
          {...register('comment')}
          className="resize-none outline-none text-sm p-2 min-h-[90px]"
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
    </>
  );
}

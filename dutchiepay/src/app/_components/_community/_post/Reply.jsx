import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import profile from '/public/image/profile.jpg';
import reply from '/public/image/community/reply.svg';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function Reply() {
  const [isReplyActive, setIsReplyActive] = useState(false); // 답글 활성화
  const [isModified, setIsModified] = useState(false); // 댓글 수정 여부
  const [commenterName, setCommenterName] = useState('한유진'); // 댓글 단 사람 이름
  const { refreshAccessToken } = useReissueToken();
  const { watch, setValue, handleSubmit } = useForm({
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
              <strong className="text-sm text-blue-500">{commenterName}</strong>
              <p className="text-xs text-gray-500">
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
          <div className="w-[500px] ml-[4px] community__comment__textarea border ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <span className="text-blue-500 font-bold mr-[5px] bg-gray-100 p-1">
                @{commenterName}
              </span>

              <span
                className="reply-input p-2 focus:outline-none"
                contentEditable={true}
                onInput={(e) => {
                  const text = e.target.innerText;
                  if (text.length > 800) {
                    e.target.innerText = text.substring(0, 800);
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(e.target);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                  } else {
                    setValue('comment', text);
                  }
                }}
              />

              <div className="flex justify-end items-center mt-2">
                <span className="text-xs text-gray-500">{`${comment.length}/800`}</span>
                <button
                  type="submit"
                  disabled={comment.length === 0}
                  className={`px-4 py-2 text-sm font-sm text-white rounded-lg ml-2 ${
                    comment.length > 0
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

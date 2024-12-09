import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Reply from './Reply';
import profile from '/public/image/otherProfile.jpg';
import reply from '/public/image/community/reply.svg';
import { useState } from 'react';

export default function Comment() {
  const [isWithdrawn, setIsWithdrawn] = useState(false); // 탈퇴한 사용자
  const [isDeleted, setIsDeleted] = useState(false); // 삭제된 댓글
  const [isReplyActive, setIsReplyActive] = useState(false); // 답글 활성화
  const [isModified, setIsModified] = useState(false); // 댓글 수정 여부

  return (
    <div className="border-b py-[16px]">
      <div className="flex items-start">
        <Image
          className="border rounded-full"
          src={profile}
          alt="profile"
          width={50}
          height={50}
        />
        <div className="w-full">
          {isDeleted ? (
            <div className="h-[45px] ml-[12px] font-bold flex items-center">
              삭제된 댓글입니다.
            </div>
          ) : (
            <>
              <div className="w-full px-[12px] py-[4px] flex justify-between items-center">
                <div className="flex gap-[8px] items-center">
                  <strong className="text-sm">
                    {isWithdrawn ? '탈퇴한 사용자' : '소풍왔니'}
                  </strong>
                  <p className="text-xs text-gray--500">
                    2024. 08. 02. 20:26{isModified && ' (수정됨)'}
                  </p>
                </div>
                {!isWithdrawn && (
                  <button
                    className="font-bold text-xs"
                    onClick={() => setIsReplyActive(!isReplyActive)}
                  >
                    답글
                  </button>
                )}
              </div>
              <p className="text-sm px-[12px]">
                팁은 정말 귀중합니다. 앞으로 더 많은 팁 기대할게요! 이런 디자인
                팁은 정말 귀중합니다.
              </p>
            </>
          )}
          <div className="mt-[8px] flex flex-col gap-[4px]">
            <Reply />
            <Reply />
          </div>
          {isReplyActive && (
            <div className="flex gap-[8px] items-start">
              <Image src={reply} alt="reply" width={20} height={20} />
              <Image
                className="w-[50px] h-[50px] border rounded-full"
                src={profile}
                alt="profile"
                width={50}
                height={50}
              />
              <textarea
                className="w-[500px] ml-[4px] community__comment__textarea"
                cols="50"
                rows="3"
                placeholder="답글을 입력해주세요."
                spellCheck="false"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

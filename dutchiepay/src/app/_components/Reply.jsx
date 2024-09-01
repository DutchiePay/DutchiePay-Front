import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import profile from '../../../public/image/profile.jpg';
import reply from '../../../public/image/reply.svg';
import { useState } from 'react';

export default function Reply() {
  const [isReplyActive, setIsReplyActive] = useState(false); // 답글 활성화

  return (
    <div className="py-[16px]">
      <div className="flex items-start">
        <Image src={reply} alt="reply" width={20} height={20} />
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
              <strong className="text-sm">한유진</strong>
              <p className="text-xs text-gray--500">2024. 08. 02. 20:26</p>
            </div>
            <div className="flex gap-[16px]">
              <button
                className="font-bold text-xs"
                onClick={(e) => setIsReplyActive(!isReplyActive)}
              >
                답글
              </button>
              <button className="font-bold text-xs">신고</button>
            </div>
          </div>
          <p className="text-sm px-[12px]">
            팁은 정말 귀중합니다. 앞으로 더 많은 팁 기대할게요! 이런 디자인 팁은
            정말 귀중합니다.
          </p>
        </div>
      </div>
      {isReplyActive && (
        <div className="mt-[24px] flex gap-[8px] items-start">
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
  );
}

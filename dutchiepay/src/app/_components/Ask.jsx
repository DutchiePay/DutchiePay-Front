'use client';

import '../../styles/mypage.css';

import Image from 'next/image';
import Link from 'next/link';
import reply from '../../../public/image/reply.svg';
import secret from '../../../public/image/secret.svg';
import { useState } from 'react';

export default function Ask() {
  const [isSecret, setIsSecret] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  return (
    <div className="w-[730px]">
      <div className="px-[30px] py-[20px] border rounded-t-lg">
        <div className="flex justify-between">
          <div className="flex justify-between items-baseline gap-[8px]">
            {isSecret && <Image className="w-[15px] h-[15px]" src={secret} alt="비밀글" width={15} height={15} />}
            <Link href="#" className="text-[18px] font-bold">
              무아스 퓨어 미니 LED 벽시계
            </Link>
            <p className="text-xs text-gray-700">2024. 07. 28. 22:32</p>
            <p className="text-xs text-blue--500 font-semibold">{isAnswered ? '답변완료' : '답변대기'}</p>
          </div>
          <button className="text-xs text-gray--500">삭제</button>
        </div>
        <p className="mt-[8px] text-sm">
          배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..? 배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..? 배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송배송언제쯤 올까요..?배송언제쯤
          올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤 올까요..?배송언제쯤
          올까요..?배배송
        </p>
      </div>
      <div className="border border-t-0 rounded-b-lg px-[40px] py-[12px] bg-gray--100">
        {isAnswered ? (
          <>
            <div className="flex gap-[8px] items-center">
              <Image className="w-[8px] h-[8px]" src={reply} alt="reply" width={8} height={8} />
              <strong className="text-blue--500">무아스</strong>
              <p className="text-xs text-gray-700">2024. 07. 28. 22:32</p>
            </div>
            <p className="text-sm pl-[16px]">
              죄송합니다 고객님 빨리 전송해드릴게요. 죄송합니다 고객님 빨리 전송해드릴게요.죄송합니다 고객님 빨리
              전송해드릴게요.죄송합니다 고객님 죄송합니다 고객님 빨리 전송해드릴게요.죄송합니다 고객님 빨리
              전송해드릴게요.죄송합니다 고객님 빨리 전송해드릴게요.빨리 전송해드릴게요.
            </p>
          </>
        ) : (
          <div className="flex justify-center">
            <p className="text-sm inline-block py-[30px] font-medium">
              아직 답변이 작성되지 않았어요. 최대한 빠르게 답변을 해드릴게요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

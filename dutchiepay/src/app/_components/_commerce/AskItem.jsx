import '@/styles/community.css';
import '@/styles/globals.css';

import Answer from './Answer';
import Image from 'next/image';
import secret from '../../../../public/image/secret.svg';
import trash from '../../../../public/image/trash.svg';
import { useState } from 'react';

export default function AskItem() {
  const [isSecret, setIsSecret] = useState(true);
  const [isMore, setIsMore] = useState(false);
  const [isMine, setIsMine] = useState(true);
  const [isAnswered, setIsAnswered] = useState(true);

  const handleIsMore = () => {
    setIsMore(!isMore);
  };

  return (
    <>
      <tr
        className={`border-b-2 border-gray-300 text-center
            ${isMore ? 'bg-blue--100' : ''}`}
      >
        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {isAnswered ? '답변완료' : '답변대기'}
        </td>

        <td className="w-[500px] px-2 py-[20px] text-start flex items-center gap-[4px]">
          {isSecret && !isMine && (
            <Image
              className="mr-[4px] flex-shrink-0"
              src={secret}
              width={16}
              height={16}
              alt="비밀글 아이콘"
            />
          )}

          <p
            className={`product-ask__text flex-1 cursor-pointer ${
              isMore ? 'line-clamp-none' : 'line-clamp-1'
            }`}
            onClick={handleIsMore}
          >
            {isMine || !isSecret
              ? '배송이 빠르고 제품 포장도 꼼꼼했습니다. 제품 자체도 튼튼하고 오래 쓸 것 같아요. 배송이 빠르고 제품 포장도 꼼꼼했습니다. 제품 자체도 튼튼하고 오래 쓸 것 같아요.'
              : '비밀글로 작성된 문의입니다.'}
          </p>
        </td>

        <td className="w-[150px] px-2 py-[20px] border-gray-300">
          최대8글자닉네임
        </td>

        <td className="w-[150px] px-2 py-[20px]">2024.05.31</td>

        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {isMine && (
            <Image
              className="m-0 m-auto cursor-pointer"
              src={trash}
              alt="삭제 아이콘"
              width={15}
              height={16}
            />
          )}
        </td>
      </tr>

      {isAnswered && (
        <Answer
          answer={
            isMine || !isSecret
              ? '문의 내용 답변입니다.'
              : '비밀글로 작성된 답변입니다.'
          }
        />
      )}
    </>
  );
}

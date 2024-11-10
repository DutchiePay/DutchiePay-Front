'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import reply from '../../../../public/image/reply.svg';
import secret from '../../../../public/image/secret.svg';
import { useState } from 'react';
import getFormatDate from '@/app/_util/getFormatDate';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MyAsks({ item }) {
  const [isSecret, setIsSecret] = useState(false);
  const [isAnswered, setIsAnswered] = useState(item.answer);
  const access = useSelector((state) => state.login.access);
  const myAsk = 'myask';

  const handleDelete = async () => {
    if (confirm('작성한 문의를 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/asks?askId=${item.askId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        alert('정상적으로 삭제되었습니다.');
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          // // 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
          // reissueTokenAndRetry(() => handleDelete());
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };
  return (
    <div className="w-[730px]">
      <div className="px-[30px] py-[20px] border rounded-t-lg">
        <div className="flex justify-between">
          <div className="flex justify-between items-baseline gap-[8px]">
            {isSecret && (
              <Image
                className="w-[15px] h-[15px]"
                src={secret}
                alt="비밀글"
                width={15}
                height={15}
              />
            )}
            <Link
              href={`/commerce/${item.buyId}`}
              className="title--single-line max-w-[350px] text-[18px] font-bold"
            >
              {item.productName}
            </Link>
            <p className="text-xs text-gray-700">
              {' '}
              {getFormatDate(myAsk, item.createdAt)}
            </p>
            <p className="text-xs text-blue--500 font-semibold">
              {isAnswered ? '답변완료' : '답변대기'}
            </p>
          </div>
          <button className="text-xs text-gray--500" onClick={handleDelete}>
            삭제
          </button>
        </div>
        <p className="mt-[8px] text-sm">{item.content}</p>
      </div>
      <div className="border border-t-0 rounded-b-lg px-[40px] py-[12px] bg-gray--100">
        {isAnswered ? (
          <>
            <div className="flex gap-[8px] items-center">
              <Image
                className="w-[8px] h-[8px]"
                src={reply}
                alt="reply"
                width={8}
                height={8}
              />
              <strong className="text-blue--500">{item.storeName}</strong>
              <p className="text-xs text-gray-700">
                {getFormatDate(myAsk, item.answeredAt)}
              </p>
            </div>
            <p className="text-sm pl-[16px]">{item.answer}</p>
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

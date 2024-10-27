import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Answer from './Answer';
import Image from 'next/image';
import secret from '../../../../public/image/secret.svg';
import trash from '../../../../public/image/trash.svg';
import useDate from '@/app/hooks/useDate';

const AskItem = React.memo(({ item }) => {
  const [isMore, setIsMore] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const nickname = useSelector((state) => state.login.user.nickname);
  console.log(nickname);

  useEffect(() => {
    setIsMine(nickname === item.nickname);
  }, [nickname, item.nickname]);

  const handleIsMore = () => {
    if (!item.isSecret) {
      setIsMore((prev) => !prev);
    }
  };

  const answerContent = useMemo(() => {
    return isMine || !item.isSecret
      ? item.answer
      : '비밀글로 작성된 답변입니다.';
  }, [isMine, item.isSecret, item.answer]);

  return (
    <>
      <tr
        className={`border-b-2 border-gray-300 text-center ${isMore ? 'bg-blue--100' : ''}`}
      >
        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {item.answer ? '답변완료' : '답변대기'}
        </td>

        <td className="w-[500px] px-2 py-[20px] text-start flex items-center leading-10 gap-[4px]">
          {item.isSecret && !isMine && (
            <Image
              className="mr-[4px] flex-shrink-0"
              src={secret}
              width={16}
              height={16}
              alt="비밀글 아이콘"
            />
          )}

          <p
            className={`flex-1 cursor-pointer ${isMore ? 'line-clamp-none' : 'line-clamp-1'}`}
            onClick={handleIsMore}
          >
            {isMine || !item.isSecret
              ? item.content
              : '비밀글로 작성된 문의입니다.'}
          </p>
        </td>

        <td className="w-[150px] px-2 py-[20px] border-gray-300">
          {item.nickname}
        </td>

        <td className="w-[150px] px-2 py-[20px]">{useDate(item.createdAt)}</td>

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

      {item.answer && <Answer answer={answerContent} />}
    </>
  );
});

export default AskItem;

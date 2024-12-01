import { useEffect, useState } from 'react';

import Answer from '@/app/_components/_commerce/_ask/Answer';
import Image from 'next/image';
import { getFormatDate } from '@/app/_util/getFormatDate';
import secret from '/public/image/secret.svg';
import trash from '/public/image/trash.svg';
import { useSelector } from 'react-redux';
import useDeleteAsk from '@/app/hooks/useDeleteAsk';

const AskItem = ({ item, company, onDelete }) => {
  const [isMore, setIsMore] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const userId = useSelector((state) => state.login.user.userId);
  const { deleteAsk } = useDeleteAsk();
  const handleDelete = async () => {
    await deleteAsk(item.askId);
    onDelete(item.askId);
  };

  useEffect(() => {
    setIsMine(userId === item.userId);
  }, [userId, item.userId]);

  const handleToggle = () => {
    setIsMore((prev) => !prev);

    setIsAnswer((prev) => !prev);
  };

  const answerContent =
    (() => {
      return isMine || !item.isSecret
        ? item.answer
        : '비밀글로 작성된 답변입니다.';
    },
    [isMine, item.isSecret, item.answer]);

  return (
    <>
      <tr
        className={`border-b-2 border-gray-300 text-center ${
          item.answer && isAnswer && item.isSecret ? 'bg-blue--100' : ''
        }`}
        onClick={() => handleToggle()}
      >
        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {item.answer ? '답변완료' : '답변대기'}
        </td>

        <td className="w-[500px] px-2 py-[20px] text-start flex items-center gap-[4px]">
          {item.isSecret && (
            <Image
              className="mr-[4px] flex-shrink-0"
              src={secret}
              width={16}
              height={16}
              alt="비밀글 아이콘"
            />
          )}

          <p
            className={`flex-1 ${item.answer ? 'cursor-pointer' : ''} ${isMore ? 'line-clamp-none' : 'line-clamp-1'}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          >
            {isMine || !item.isSecret
              ? item.content
              : '비밀글로 작성된 문의입니다.'}
          </p>
        </td>

        <td className="w-[150px] px-2 py-[20px] border-gray-300">
          {item.nickname}
        </td>

        <td className="w-[150px] px-2 py-[20px]">
          {getFormatDate('ask', item.createdAt)}
        </td>

        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {isMine && (
            <Image
              className="m-0 m-auto cursor-pointer"
              src={trash}
              alt="삭제 아이콘"
              width={15}
              height={16}
              onClick={handleDelete}
            />
          )}
        </td>
      </tr>

      {item.answer && isAnswer && (!item.isSecret || item.isMine) && (
        <Answer answer={answerContent} company={company} item={item} />
      )}
    </>
  );
};

export default AskItem;

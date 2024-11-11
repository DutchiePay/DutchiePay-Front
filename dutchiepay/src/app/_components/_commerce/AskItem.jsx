import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import secret from '../../../../public/image/secret.svg';
import trash from '/public/image/trash.svg';
import Answer from './Answer';
import getFormatDate from '@/app/_util/getFormatDate';

const AskItem = ({ item, company }) => {
  const [isMore, setIsMore] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false); // Answer 표시 여부 상태
  const userId = useSelector((state) => state.login.user.userId);
  useEffect(() => {
    setIsMine(userId === item.userId);
  }, [userId, item.userId]);

  const handleToggle = () => {
    if (!item.isSecret) {
      setIsMore((prev) => !prev);
    }
    setIsAnswer((prev) => !prev); // 클릭 시 Answer 표시 여부 변경
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
        className={`border-b-2 border-gray-300 text-center ${isAnswer ? 'bg-blue--100' : ''}`}
        onClick={() => handleToggle()} // 하나의 함수로 클릭 핸들러 변경
      >
        <td className="w-[100px] px-2 py-[20px] border-gray-300">
          {item.answer ? '답변완료' : '답변대기'}
        </td>

        <td className="w-[500px] px-2 py-[20px] text-start flex items-center gap-[4px]">
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
            onClick={(e) => {
              e.stopPropagation(); // 클릭 이벤트 전파 방지
              handleToggle(); // 클릭 시 상태 변경
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
            />
          )}
        </td>
      </tr>

      {isAnswer && ( // isAnswer가 true일 때 Answer 표시
        <Answer answer={answerContent} company={company} item={item} />
      )}
    </>
  );
};

export default AskItem;

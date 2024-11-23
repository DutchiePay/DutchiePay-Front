import Image from 'next/image';
import reply from '/public/image/reply.svg';
import { getFormatDate } from '@/app/_util/getFormatDate';

const AskResponse = ({ item, isAnswered }) => {
  return (
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
              {getFormatDate('myask', item.answeredAt)}
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
  );
};

export default AskResponse;

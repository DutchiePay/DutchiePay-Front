import Image from 'next/image';
import Link from 'next/link';
import secret from '/public/image/secret.svg';
import { getFormatDate } from '@/app/_util/getFormatDate';

const AskHeader = ({ item, isAnswered, onDelete }) => {
  return (
    <div className="flex justify-between">
      <div className="flex justify-between items-baseline gap-[8px]">
        {item.isSecret && (
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
          {getFormatDate('myask', item.createdAt)}
        </p>
        <p className="text-xs text-blue--500 font-semibold">
          {isAnswered ? '답변완료' : '답변대기'}
        </p>
      </div>
      <button className="text-xs text-gray--500" onClick={onDelete}>
        삭제
      </button>
    </div>
  );
};

export default AskHeader;

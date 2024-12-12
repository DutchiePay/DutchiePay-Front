import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import comment from '/public/image/comment.svg';

export default function SimilarPostList({ item }) {
  return (
    <div>
      <div className="flex items-center gap-[4px]">
        <Image
          className="w-[16px] h-[16px] rounded-full border"
          src={item.writerProfileImg}
          alt="프로필"
          width={16}
          height={16}
        />
        <strong className="text-sm">{item.writer}</strong>
      </div>
      <div className="flex justify-between items-center mt-[4px]">
        <Link
          href={`/community/${item.freeId}`}
          className="cursor-pointer text-sm"
        >
          {item.title}
        </Link>
        <div className="flex gap-[4px] items-center">
          <Image
            className="w-[15px] h-[15px]"
            src={comment}
            alt="댓글"
            width={15}
            height={15}
          />
          <p className="text-sm text-gray--500">
            {item.commentCount > 99 ? '99+' : item.commentCount}
          </p>
        </div>
      </div>
    </div>
  );
}

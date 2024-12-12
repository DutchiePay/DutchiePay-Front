import '@/styles/community.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import comment from '/public/image/comment.svg';
import profile from '/public/image/profile.jpg';

export default function Post_Similar() {
  return (
    <div>
      <div className="flex items-center gap-[4px]">
        <Image
          className="w-[16px] h-[16px] rounded-full border"
          src={profile}
          alt="프로필"
          width={16}
          height={16}
        />
        <strong className="text-sm">석양공주님</strong>
      </div>
      <div className="flex justify-between items-center mt-[4px]">
        <Link
          href="/community/detail?postId=789"
          className="cursor-pointer text-sm"
        >
          자취 꿀팁 공유합니다!🐝
        </Link>
        <div className="flex gap-[4px] items-center">
          <Image
            className="w-[15px] h-[15px]"
            src={comment}
            alt="댓글"
            width={15}
            height={15}
          />
          <p className="text-sm text-gray--500">99+</p>
        </div>
      </div>
    </div>
  );
}

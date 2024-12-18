import '@/styles/mypage.css';
import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import Link from 'next/link';
import comment from '/public/image/comment.svg';
import mart from '/public/image/mart.jpg';
import profile from '/public/image/profile.jpg';
import community from '/public/image/community.jpg';
export default function MyPostList({ item }) {
  return (
    <Link
      href={`/mart/detail?postId=${item.postId}`}
      className="w-[220px] flex flex-col gap-[4px] cursor-pointer"
    >
      <div className="w-full h-[148px] relative overflow-hidden">
        {item.category == '마트/배달' ? (
          <Image
            className="w-full h-[148px] transform transition-transform duration-300 hover:scale-110 object-cover"
            src={item.thunmbnail || mart}
            alt={item.description}
            fill
          />
        ) : (
          <Image
            className="w-full h-[148px] transform transition-transform duration-300 hover:scale-110 object-cover"
            src={item.thunmbnail || community}
            alt={item.description}
            fill
          />
        )}
      </div>

      <div className="flex justify-between items-center py-[6px] border-b">
        <p className="text-blue--500 text-sm font-semibold">{item.category}</p>
        {item.category !== '마트/배달' ? (
          <div className="flex items-center gap-[8px]">
            <Image src={comment} width={20} height={20} alt="댓글" />
            <p className="text-sm text-gray--500">
              {' '}
              {item.commentCount > 99 ? '99+' : item.commentCount}
            </p>
          </div>
        ) : (
          ''
        )}
      </div>

      <strong className="mt-[4px] title--multi-line">{item.title}</strong>
      <p className="text-xs text-gray--500 title--multi-line title--multi-line-3 mt-[4px] mb-[8px]">
        {item.description}
      </p>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-[4px] items-center">
          <Image
            className="w-[16px] h-[16px] border rounded-full"
            src={item.writerProfileImg || profile}
            alt="profile"
            width={16}
            height={16}
          />
          <p className="font-semibold text-xs">{item.writerNickname}</p>
        </div>
        <p className="text-[12px] text-gray--500">{item.writeTime}</p>
      </div>
    </Link>
  );
}

'use client';

import ChatButton from './ChatButton';
import Image from 'next/image';
import LandingMap from '@/app/_components/_community/_local/LandingMap';
import PostState from './PostState';
import info from '/public/image/info.svg';
import { useSelector } from 'react-redux';

export default function TradeDetailInfo({ post, postId }) {
  const userId = useSelector((state) => state.login.user.userId);

  return (
    <article className="w-[290px] h-[750px] sticky top-[150px] pl-[20px] py-[40px]">
      <div className="flex items-center gap-[8px]">
        <Image
          className="w-[30px] h-[30px]"
          src={info}
          alt="info"
          width={30}
          height={30}
        />
        <h2 className="text-2xl font-bold">상세 정보</h2>
      </div>
      <small className="text-xs text-gray--500">
        기재된 내용은 변동될 수 있습니다.
      </small>
      <div className="flex flex-col gap-[12px] mt-[16px] mb-[24px]">
        <div className="flex justify-between items-center">
          <strong>판매 상품</strong>
          <span className="flex gap-[4px]">{post.goods}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong>판매 가격</strong>
          <p>{post.price}</p>
        </div>
        <div className="flex justify-between items-center">
          <strong>장소</strong>
          <p>{post.meetingPlace}</p>
        </div>
        <LandingMap
          lat={post.latitude}
          lng={post.longitude}
          meetingPlace={post.meetingPlace}
        />
        <PostState
          isTrade={true}
          isMyPostWritten={post.writerId === userId}
          state={post.state}
          postId={postId}
        />
      </div>
      <ChatButton postId={postId} type="purchase" />
    </article>
  );
}

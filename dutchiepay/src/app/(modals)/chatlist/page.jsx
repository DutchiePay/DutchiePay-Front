'use client';
import Image from 'next/image';
import arrow from '/public/image/chat/arrow.svg';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/styles/globals.css';
import axios from 'axios';

export default function ChatList() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);
  const router = useRouter();

  const fetchChat = useCallback(async () => {
    try {
      if (hasFetched.current) return;
      hasFetched.current = true;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/chatRoomList`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      setChatList(response.data);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, []);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  const handleChatClick = (chatRoomId) => {
    router.push(`/chat?chatRoomId=${chatRoomId}`);
  };

  return (
    <div className="w-full max-w-[480px] h-auto">
      <div className="flex gap-[16px] w-[480px] h-[70px] p-3 items-center text-lg font-bold border-b cursor-pointer mb-[16px]">
        모든 채팅
        <Image src={arrow} alt="화살표" />
      </div>
      {chatList.map((chat) => (
        <div
          key={chat.chatRoomId}
          className="scrollable p-3 flex border-b cursor-pointer"
          onClick={() => handleChatClick(chat.chatRoomId)}
        >
          <Image
            src={chat.chatImg || profile}
            alt="프로필이미지"
            width={70}
            height={70}
            className="rounded-lg border"
          />
          <div className="p-3 w-[480px]">
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">{chat.chatName}</div>
              <div className="text-xs text-gray--500">{chat.lastChatTime}</div>
            </div>
            <div className="flex justify-between items-center relative">
              <div>{chat.lastMsg}</div>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center text-white text-xs">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

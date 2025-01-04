'use client';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CahtListHeader from '@/app/_components/_chat/ChatListHeader';
import Link from 'next/link';
import Image from 'next/image';
import useWebSocket from '@/app/hooks/useWebSocket';
import mart from '/public/image/mart.jpg';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function ChatList() {
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);
  const { isConnected } = useWebSocket(access);
  const { refreshAccessToken } = useReissueToken();
  const dummyChatList = [
    {
      chatRoomId: 1,
      chatName: '첫 번째 채팅방',
      lastChatTime: '오후 11:11',
      lastMsg: '안녕하세요!',
      unreadCount: 2,
      chatImg: null,
    },
    {
      chatRoomId: 2,
      chatName: '두 번째 채팅방',
      lastChatTime: '오후 11:11',
      lastMsg: '어떻게 지내세요?',
      unreadCount: 0,
      chatImg: mart,
    },
    {
      chatRoomId: 3,
      chatName: '세 번째 채팅방',
      lastChatTime: '오후 11:11',
      lastMsg: '회식 가자!',
      unreadCount: 1,
      chatImg: null,
    },
  ];
  const fetchChat = async () => {
    try {
      if (hasFetched.current) return;
      hasFetched.current = true;

      // const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_BASE_URL}/chat/chatRoomList`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access}`,
      //     },
      //   }
      // );
      // setChatList(response.data);
      setChatList(dummyChatList);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await fetchChat();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);
  useEffect(() => {
    if (isConnected) {
      console.log('WebSocket 연결됨.');
    } else {
      console.log('WebSocket 연결 해제됨.');
    }
  }, [isConnected]);

  return (
    <div className="scrollable w-full max-w-[480px]">
      <CahtListHeader />
      {chatList.map((chat) => (
        <Link
          key={chat.chatRoomId}
          className="p-3 flex border-b cursor-pointer hover:bg-gray-100 transition duration-200"
          href={`/chat?chatRoomId=${chat.chatRoomId}`}
        >
          <Image
            src={chat.chatImg || mart}
            alt="채팅방이미지"
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
        </Link>
      ))}
    </div>
  );
}

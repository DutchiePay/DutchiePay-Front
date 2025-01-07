'use client';
import '@/styles/globals.css';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CahtListHeader from '@/app/_components/_chat/ChatListHeader';
import Image from 'next/image';
import useWebSocket from '@/app/hooks/useWebSocket';
import mart from '/public/image/mart.jpg';
import useReissueToken from '@/app/hooks/useReissueToken';
import chatIcon from '/public/image/chat/chat.svg';
export default function ChatList() {
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);
  const { isConnected } = useWebSocket(access);
  const { refreshAccessToken } = useReissueToken();
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
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        hasFetched.current = false;
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
  }, [access, refreshAccessToken]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

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
      {chatList.length === 0 ? (
        <div className="mt-[30%]">
          <Image className="m-auto" src={chatIcon} alt="채팅방아이콘" />
          <p className="mt-[20px] text-center text-gray--500">
            참여중인 채팅방이 없습니다.
          </p>
        </div>
      ) : (
        chatList.map((chat) => (
          <div
            key={chat.chatRoomId}
            className="p-3 flex border-b cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={() => {
              const chatInfo = {
                chatImg: chat.chatImg || mart,
                chatName: chat.chatName,
                chatRoomId: chat.chatRoomId,
                chatUser: chat.chatUser,
                lastChatTime: chat.lastChatTime,
                lastMsg: chat.lastMsg,
                type: chat.type,
                unreadCount: chat.unreadCount,
              };
              sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));
              window.location.href = `/chat?chatRoomId=${chat.chatRoomId}`;
            }}
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
                <div className="text-xs text-gray--500">
                  {chat.lastChatTime}
                </div>
              </div>
              <div className="flex justify-between items-center relative max-w-[300px]">
                <div className="title--single-line">{chat.lastMsg}</div>
                {chat.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center text-white text-xs">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

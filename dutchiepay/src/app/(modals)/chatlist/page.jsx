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
import useLeaveChat from '@/app/hooks/useLeaveChat';
import ContextMenu from '@/app/_components/_chat/ContextMenu';
import ChatItem from '@/app/_components/_chat/ChatItem';

export default function ChatList() {
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);
  const { isConnected } = useWebSocket(access);
  const { refreshAccessToken } = useReissueToken();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    chat: null,
  });

  const { handleLeaveChat } = useLeaveChat();

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

  const handleContextMenu = (event, chat) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      chat: chat,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleLeaveChatWrapper = async () => {
    if (contextMenu.chat) {
      await handleLeaveChat(contextMenu.chat.chatRoomId);
      handleCloseContextMenu();
    }
  };

  return (
    <div
      className="scrollable w-full max-w-[480px]"
      onClick={handleCloseContextMenu}
    >
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
          <ChatItem
            key={chat.chatRoomId}
            chat={chat}
            onContextMenu={handleContextMenu}
          />
        ))
      )}
      <ContextMenu
        contextMenu={contextMenu}
        onClose={handleCloseContextMenu}
        onLeaveChat={handleLeaveChatWrapper}
      />
    </div>
  );
}

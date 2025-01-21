'use client';
import '@/styles/globals.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatListHeader from '@/app/_components/_chat/ChatListHeader';
import Image from 'next/image';
import useWebSocket from '@/app/hooks/useWebSocket';
import useReissueToken from '@/app/hooks/useReissueToken';
import useLeaveChat from '@/app/hooks/useLeaveChat';
import ContextMenu from '@/app/_components/_chat/ContextMenu';
import ChatItem from '@/app/_components/_chat/ChatItem';
import chatIcon from '/public/image/chat/chat.svg';

export default function ChatList() {
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);
  const { isConnected } = useWebSocket(access);
  const { refreshAccessToken } = useReissueToken();
  const [filterType, setFilterType] = useState('all');
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    chat: null,
  });

  const handleChatListUpdate = useCallback((chatRoomId) => {
    setChatList((prevList) =>
      prevList.filter((chat) => chat.chatRoomId !== chatRoomId)
    );
  }, []);

  const { handleLeaveChat } = useLeaveChat(handleChatListUpdate);

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

  const filteredChatList = chatList.filter((chat) => {
    if (filterType === 'all') return true;
    if (filterType === 'direct') return chat.type === 'direct';
    if (filterType === 'group') return chat.type === 'group';
    return true;
  });

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
      <ChatListHeader setFilterType={setFilterType} />
      {filteredChatList.length === 0 ? (
        <div className="mt-[30%]">
          <Image className="m-auto" src={chatIcon} alt="채팅방아이콘" />
          <p className="mt-[20px] text-center text-gray--500">
            참여중인 채팅방이 없습니다.
          </p>
        </div>
      ) : (
        filteredChatList.map((chat) => (
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

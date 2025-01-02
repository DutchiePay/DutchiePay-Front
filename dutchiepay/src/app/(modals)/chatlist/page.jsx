'use client';
import Image from 'next/image';
import profile from '/public/image/profile.jpg';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CahtListHeader from '@/app/_components/_chat/ChatListHeader';
import useDeleteChat from '@/app/hooks/useDeleteChat ';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
export default function ChatList() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const access = useSelector((state) => state.login.access);
  const hasFetched = useRef(false);
  const [chatList, setChatList] = useState([]);

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const deleteChat = useDeleteChat(access);
  const handleContextMenu = (chat, event) => {
    event.preventDefault();
    setSelectedChat(chat);
    setPopupPosition({ x: event.clientX, y: event.clientY });
    setPopupVisible(true);
  };
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const dummyData = [
    {
      chatRoomId: 1,
      chatImg: '',
      chatName: '친구 1',
      lastChatTime: '1시간 전',
      lastMsg: '안녕! 오늘 뭐해?',
      unreadCount: 2,
    },
    {
      chatRoomId: 2,
      chatImg: '',
      chatName: '친구 2',
      lastChatTime: '어제',
      lastMsg: '우리 언제 만날까?',
      unreadCount: 0,
    },
    {
      chatRoomId: 3,
      chatImg: '',
      chatName: '친구 3',
      lastChatTime: '2일 전',
      lastMsg: '프로젝트 잘 됐어?',
      unreadCount: 1,
    },
    {
      chatRoomId: 4,
      chatImg: '',
      chatName: '친구 4',
      lastChatTime: '3일 전',
      lastMsg: '저녁 먹자!',
      unreadCount: 3,
    },
    {
      chatRoomId: 5,
      chatImg: '',
      chatName: '친구 5',
      lastChatTime: '5일 전',
      lastMsg: '축하해!',
      unreadCount: 0,
    },
    {
      chatRoomId: 6,
      chatImg: '',
      chatName: '친구 5',
      lastChatTime: '5일 전',
      lastMsg: '축하해!',
      unreadCount: 0,
    },
    {
      chatRoomId: 7,
      chatImg: '',
      chatName: '친구 5',
      lastChatTime: '5일 전',
      lastMsg: '축하해!',
      unreadCount: 0,
    },
    {
      chatRoomId: 8,
      chatImg: '',
      chatName: '친구 5',
      lastChatTime: '5일 전',
      lastMsg: '축하해!',
      unreadCount: 0,
    },
    {
      chatRoomId: 9,
      chatImg: '',
      chatName: '친구 5',
      lastChatTime: '5일 전',
      lastMsg: '축하해!',
      unreadCount: 0,
    },
  ];

  const fetchChat = useCallback(async () => {
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
      // console.log(response.data);

      setChatList(dummyData);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, []);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  return (
    <div className="scrollable w-full max-w-[480px]">
      <CahtListHeader />
      {chatList.map((chat) => (
        <Link
          key={chat.chatRoomId}
          className="p-3 flex border-b cursor-pointer hover:bg-gray-100 transition duration-200"
          href={`/chat?chatRoomId=${chat.chatRoomId}`}
          onContextMenu={(event) => handleContextMenu(chat, event)}
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
        </Link>
      ))}

      {popupVisible && (
        <div
          className="absolute bg-white border rounded shadow-lg p-3"
          style={{ left: popupPosition.x, top: popupPosition.y }}
        >
          <div className="cursor-pointer text-sm">읽음으로 표시</div>
          <div
            className="cursor-pointer text-sm"
            onClick={() => {
              deleteChat(selectedChat.chatRoomId);
              setPopupVisible(false);
            }}
          >
            채팅방 나가기
          </div>
        </div>
      )}
    </div>
  );
}

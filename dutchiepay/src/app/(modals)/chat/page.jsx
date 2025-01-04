'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import useWebSocket from '@/app/hooks/useWebSocket';
import Image from 'next/image';
import Link from 'next/link';
import back from '/public/image/chat/back.svg';
import people from '/public/image/chat/people.svg';
import profile from '/public/image/profile.jpg';
import {
  getformatCahtTime,
  getformatCahtDate,
} from '@/app/_util/getFormatDate';
import ChatActionButton from '@/app/_components/_chat/ChatActionButton';
import ChatMessageList from '@/app/_components/_chat/ChatMessageList';

export default function Chat() {
  const access = useSelector((state) => state.login.access);
  const { client, isConnected } = useWebSocket(access);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatRoomId');
  const senderId = useSelector((state) => state.login.user.userId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const dummyMessages = [
    {
      chatId: 1,
      content: '첫 번째 채팅입니다.',
      sendAt: getformatCahtTime(new Date()),
      senderId: 123,
      senderName: '단단무지',
      senderProfileImg: profile,
      date: '2024-12-19',
      type: 'text',
    },
    {
      chatId: 2,
      content:
        'http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmart.d8208fd0.jpg&w=1920&q=75',
      sendAt: getformatCahtTime(new Date()),
      senderId: 112,
      senderName: '단단무지',
      senderProfileImg: profile,
      date: '2024-12-19',
      type: 'img',
    },
    {
      chatId: 3,
      content: '내가 보낸 채팅',
      sendAt: getformatCahtTime(new Date()),
      senderId: 11,
      senderName: '단단무지',
      senderProfileImg: profile,
      date: '2024-12-19',
      type: 'text',
    },
  ];
  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!client || !isConnected) {
      return;
    }

    const messageData = {
      chatId: messages.length + 1,
      content: newMessage,
      sendAt: getformatCahtTime(new Date()),
      senderId: senderId,
      senderName: '나',
      senderProfileImg: profile,
      date: getformatCahtDate(new Date()),
      type: 'text',
    };

    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage('');
  };

  return (
    <div className="w-[480px] h-[732px] flex flex-col">
      <div className="h-[12%] p-4 border-b border-gray--300 mb-[20px]">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-lg font-bold mb-[8px]">게시글 제목</div>
          <Link href="/chatlist">
            <Image src={back} alt="뒤로가기 버튼" />
          </Link>
        </div>
        <div className="flex w-full items-center gap-[4px]">
          <Image src={people} width={16} height={16} alt="참여자" />
          <span className="text-[16px]">2</span>
        </div>
      </div>
      <ChatMessageList messages={messages} senderId={senderId} />
      <ChatActionButton
        setNewMessage={setNewMessage}
        handleSend={handleSend}
        newMessage={newMessage}
      />
    </div>
  );
}

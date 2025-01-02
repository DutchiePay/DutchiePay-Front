'use client';
import '@/styles/commerce.css';
import '@/styles/globals.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'next/navigation';

export default function Chat() {
  const access = useSelector((state) => state.login.access);
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatRoomId');
  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/chat`);

    const stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${access}`,
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`/sub?chatRoomId=${chatId}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error: ', error);
      },
      onDisconnect: (frame) => {
        console.log('Disconnected: ' + frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [access]); // chatId에 따라 effect 실행

  const handleSend = () => {
    const messageData = {
      chatroomId: chatId,
      // other message fields...
      content: newMessage,
      sendTime: new Date().toISOString(),
    };

    try {
      client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(messageData),
      });
      setNewMessage(''); // 입력 필드 초기화
    } catch (error) {
      console.error('메시지 전송 오류:', error);
    }
  };
  return (
    <div className="w-full max-w-[600px] mx-auto h-[90vh] flex flex-col border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-gray-100">
      {/* 헤더 */}
      <div className="flex items-center justify-between bg-white p-4 border-b border-gray-300 shadow">
        <div className="flex-1 text-sm font-bold">판매자: {'테스트'}</div>
      </div>

      {/* 메시지 리스트 */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex flex-col ${message.sender === 'buyer' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`inline-block max-w-[70%] p-3 rounded-lg shadow ${message.sender === 'buyer' ? 'bg-yellow-100 text-green-800 rounded-tl-lg' : 'bg-gray-200 text-gray-800 rounded-tr-lg'}`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">{message.time}</div>
          </div>
        ))}
      </div>

      {/* 입력 창 */}
      <div className="flex p-3 border-t border-gray-300 bg-white items-center">
        <input
          className="flex-1 p-3 text-sm border border-gray-300 rounded-full bg-gray-200 focus:outline-none focus:ring focus:ring-green-300"
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className={`ml-2 p-2 rounded-full text-white transition-colors duration-300 ${isHovered ? 'bg-green-700' : 'bg-green-600'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSend}
        >
          보내기
        </button>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import useWebSocket from '@/app/hooks/useWebSocket';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import back from '/public/image/chat/back.svg';
import people from '/public/image/chat/people.svg';
import profile from '/public/image/profile.jpg';
import axios from 'axios';
import Link from 'next/link';
import ChatMessageList from '@/app/_components/_chat/ChatMessageList';
import ChatActionButton from '@/app/_components/_chat/ChatActionButton';
import useFetchChatUser from '@/app/hooks/useFetchChatUer';

export default function Chat() {
  const access = useSelector((state) => state.login.access);
  const nickname = useSelector((state) => state.login.user.nickname);
  const { client, isConnected } = useWebSocket(access);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatRoomId');
  const senderId = useSelector((state) => state.login.user.userId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageType, setNewMessageType] = useState('text');
  const { setValue } = useForm();
  const [chatName, setChatName] = useState('');
  const [chatUserCount, setChatUserCount] = useState(0);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [isMemberKicked, setIsMemberKicked] = useState(false);
  const { fetchChatUser, chatUsers } = useFetchChatUser();
  const hasFetched = useRef(false);
  console.log(chatUsers);

  const toggleFilters = async () => {
    setFiltersVisible((prev) => !prev);
    if (!isFiltersVisible) {
      hasFetched.current = false;
      await fetchChatUser(chatId);
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchChatUser(chatId);
    }
  }, [chatId, fetchChatUser]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/message?chatRoomId=${chatId}&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(response.data);

      setMessages(response.data.messages);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  }, [chatId, access]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const chatInfo = JSON.parse(sessionStorage.getItem('chatInfo'));
    if (chatInfo) {
      setChatName(chatInfo.chatName);
      setChatUserCount(chatInfo.chatUser);
    }

    if (isConnected && chatId) {
      const subscription = client.subscribe(
        `/sub/chat/${chatId}`,
        (messageOutput) => {
          const message = JSON.parse(messageOutput.body);
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, isConnected, chatId]);

  const handleSend = async (messageData) => {
    if (!client || !isConnected) {
      return;
    }

    try {
      await client.publish({
        destination: `/pub/chat/${chatId}`,
        body: JSON.stringify(messageData),
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: messageData.type,
          senderId: senderId,
          content: messageData.content,
          date: messageData.date,
          time: messageData.time,
        },
      ]);

      fetchMessages();
      setNewMessage('');
      setNewMessageType('text');
      setValue('comment', '');
    } catch (error) {
      alert('메시지 수신중 에러가 발생했습니다.');
    }
  };

  const handleCheckboxChange = () => {
    setIsMemberKicked((prev) => !prev);
  };

  return (
    <div className="w-[480px] h-[732px] flex flex-col">
      <div className="h-[12%] p-4 border-b border-gray--300 ">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-lg font-bold mb-[8px]">{chatName}</div>
          <Link href="/chatlist">
            <Image src={back} alt="뒤로가기 버튼" />
          </Link>
        </div>
        <div
          className="flex w-full items-center gap-[4px] cursor-pointer"
          onClick={toggleFilters}
        >
          <Image src={people} width={16} height={16} alt="참여자" />
          <span className="text-[16px]">{chatUserCount}</span>
        </div>
        <div
          className={`absolute left-6 w-[230px] overflow-hidden ${isFiltersVisible ? 'border border-gray-300  z-[10]' : 'h-0'}`}
        >
          <div className="text-center bg-white shadow-md p-2">
            <div className="flex w-full justify-between items-center p-3">
              <div className="flex gap-[16px] items-center">
                <Image
                  src={profile}
                  width={35}
                  height={35}
                  alt="참여자"
                  className="rounded-full border"
                />
                {nickname}
              </div>
              <div className="text-white bg-black w-6 h-6 rounded-sm">나</div>
            </div>
            {chatUsers.map(
              (user) =>
                nickname !== user.nickname && (
                  <div
                    key={user.id}
                    className="flex w-full justify-between items-center p-3"
                  >
                    <label htmlFor={`kickMember-${user.id}`}>
                      <div className="flex gap-[16px] items-center">
                        <Image
                          src={user.profileImg || profile}
                          width={35}
                          height={35}
                          alt="참여자"
                          className="rounded-full border"
                        />
                        {user.nickname}
                      </div>
                    </label>
                    <input
                      id={`kickMember-${user.id}`}
                      type="checkbox"
                      className="login__checkbox w-6 h-6 border border-gray-300 checked:bg-blue--500"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                )
            )}

            <div
              className={`text-gray--500 pt-3 pb-2 border-t ${isMemberKicked ? '' : ''}`}
            >
              {isMemberKicked
                ? `1명 내보내기`
                : `현재 채팅방 인원 : ${chatUserCount}명`}{' '}
            </div>
          </div>
        </div>
      </div>
      <ChatMessageList messages={messages} senderId={senderId} />
      <ChatActionButton
        setNewMessage={setNewMessage}
        handleSend={handleSend}
        newMessage={newMessage}
        newMessageType={newMessageType}
        setNewMessageType={setNewMessageType}
      />
    </div>
  );
}

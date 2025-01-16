'use client';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import useWebSocket from '@/app/hooks/useWebSocket';
import useInfiniteScroll from '@/app/hooks/useInfiniteScroll';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import back from '/public/image/chat/back.svg';
import people from '/public/image/chat/people.svg';
import ChatMessageList from '@/app/_components/_chat/ChatMessageList';
import ChatActionButton from '@/app/_components/_chat/ChatActionButton';
import useFetchChatUser from '@/app/hooks/useFetchChatUer';
import useKickMember from '@/app/hooks/useKickMember';
import ChatUserInfo from '@/app/_components/_chat/CahtUserInfo';
import Link from 'next/link';

export default function Chat() {
  const access = useSelector((state) => state.login.access);
  const nickname = useSelector((state) => state.login.user.nickname);
  const { client, isConnected } = useWebSocket(access);
  const searchParams = useSearchParams();
  const chatId = searchParams.get('chatRoomId');
  const senderId = useSelector((state) => state.login.user.userId);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageType, setNewMessageType] = useState('text');
  const { setValue } = useForm();
  const [chatName, setChatName] = useState('');
  const [chatUserCount, setChatUserCount] = useState(0);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { fetchChatUser, chatUsers } = useFetchChatUser();
  const { handleKickMembers } = useKickMember();
  const hasFetched = useRef(false);

  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/message?chatRoomId=${chatId}&limit=15`;
  const {
    items: messages,
    lastItemRef,
    hasMore,
    isLoading,
    setItems,
  } = useInfiniteScroll({ fetchUrl });

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

      setNewMessage('');
      setNewMessageType('text');
      setValue('comment', '');
      setItems((prevItems) => [...prevItems, messageData]);
    } catch (error) {
      alert('메시지 수신 중 에러가 발생했습니다.');
    }
  };
  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleKickMembersClick = async () => {
    if (selectedUserIds.length > 0) {
      await handleKickMembers(chatId, selectedUserIds);
      setSelectedUserIds([]);
    }
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
        <ChatUserInfo
          nickname={nickname}
          chatUsers={chatUsers}
          selectedUserIds={selectedUserIds}
          handleCheckboxChange={handleCheckboxChange}
          handleKickMembersClick={handleKickMembersClick}
          isFiltersVisible={isFiltersVisible}
          chatUserCount={chatUserCount}
        />
      </div>
      <ChatMessageList
        messages={messages}
        senderId={senderId}
        lastItemRef={lastItemRef}
        hasMore={hasMore}
        isLoading={isLoading}
      />
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

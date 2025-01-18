import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import profile from '/public/image/profile.jpg';
import getMessageTime from '@/app/_util/getMessageTime';

const ChatMessageList = ({ messages, senderId, lastItemRef, isLoading }) => {
  const [clickedLinks, setClickedLinks] = useState(new Set());
  const [lastDisplayedDate, setLastDisplayedDate] = useState(null);
  const messagesEndRef = useRef(null);
  const handleLinkClick = (link) => {
    setClickedLinks((prev) => new Set(prev).add(link));
  };
  console.log(messages);

  const renderMessageContent = (message) => {
    if (message.type === 'img') {
      return (
        <a href={message.content} target="_blank" rel="noopener noreferrer">
          <div className="relative overflow-hidden">
            <Image src={message.content} alt="사진" width={500} height={500} />
          </div>
        </a>
      );
    }

    return (
      <div>
        {message.content.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
          part.match(/https?:\/\/[^\s]+/) ? (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline ${clickedLinks.has(part) ? 'text-blue--600' : ''}`}
              onClick={() => handleLinkClick(part)}
            >
              {part}
            </a>
          ) : (
            part
          )
        )}
      </div>
    );
  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const lastDate = lastDisplayedDate;

    const lastMessageDate = new Date(
      messages[messages.length - 1]?.sendAt
    ).toLocaleDateString();

    if (lastDate !== currentDate && lastMessageDate === currentDate) {
      setLastDisplayedDate(currentDate);
    }
  }, [messages, lastDisplayedDate]);

  useEffect(() => {
    if (lastItemRef) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [lastItemRef]);

  return (
    <div className="flex-1 px-4 overflow-y-auto scrollable bg-white">
      {messages.map((message, index) => {
        const showProfileImage =
          message.senderId !== senderId &&
          (index === 0 || message.sendAt !== messages[index - 1]?.sendAt);
        const messageElement = (
          <div
            key={index}
            className={`mb-4 flex flex-col ${message.senderId === senderId ? 'items-end' : 'items-start'}`}
            ref={index === 0 ? lastItemRef : null}
          >
            {lastDisplayedDate === message.sendAt && (
              <div className="flex justify-center w-full">
                <h2 className="system-message-date w-full text-center">
                  &nbsp;&nbsp;{message.date}&nbsp;&nbsp;
                </h2>
              </div>
            )}

            {(message.type === 'ban' ||
              message.type === 'enter' ||
              message.type === 'out' ||
              message.type === 'mout') && (
              <div className="flex justify-center w-full">
                <h2 className="px-3 rounded-full bg-gray--100 w-[60%] text-center mb-[10px]">
                  &nbsp;&nbsp;{message.content}&nbsp;&nbsp;
                </h2>
              </div>
            )}

            {(message.type === 'text' || message.type === 'img') && (
              <div
                className={`flex ${message.senderId === senderId ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`${message.senderId !== senderId ? `w-[40px] h-[40px] mr-[10px] ${showProfileImage ? '' : 'w-[40px] h-[40px]'}` : ''}`}
                >
                  {showProfileImage && (
                    <Image
                      src={message.senderProfileImg || profile}
                      alt="프로필"
                      width={40}
                      height={40}
                      className="border rounded-full"
                    />
                  )}
                </div>
                <div>
                  {message.senderId !== senderId &&
                    message.senderName &&
                    showProfileImage && (
                      <div className="block text-sm mb-[4px]">
                        {message.senderName}
                      </div>
                    )}

                  <div
                    className={`inline-block max-w-[100%] p-3 rounded-lg ${message.senderId === senderId ? 'bg-gray--100' : 'bg-blue--500 text-white'}`}
                  >
                    {renderMessageContent(message)}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`text-xs text-gray--500 ${getMessageTime({ index, messages }) ? 'mt-3' : 'mt-7'}  flex items-end ${message.senderId === senderId ? 'justify-end mr-[10px]' : 'ml-[10px]'}`}
                  >
                    {message.unreadCount !== null
                      ? message.unreadCount
                      : '\u00A0'}
                  </div>
                  <div
                    className={`text-xs min-w-[70px] text-gray--500 flex items-end ${message.senderId === senderId ? 'justify-end mr-[10px]' : 'ml-[10px]'}`}
                  >
                    {getMessageTime({ index, messages }) ? message.time : ''}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        return messageElement;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;

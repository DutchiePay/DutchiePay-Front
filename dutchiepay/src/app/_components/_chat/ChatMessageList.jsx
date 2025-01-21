import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import profile from '/public/image/profile.jpg';
import getMessageTime from '@/app/_util/getMessageTime';

const ChatMessageList = ({ messages, senderId, lastItemRef, chatUsers }) => {
  const [clickedLinks, setClickedLinks] = useState(new Set());
  const [lastDisplayedDate, setLastDisplayedDate] = useState(null);
  const messagesEndRef = useRef(null);
  const [senderNicknames, setSenderNicknames] = useState({});
  const [senderProfileImgs, setSenderProfileImgs] = useState({});
  console.log(chatUsers);

  const handleLinkClick = (link) => {
    setClickedLinks((prev) => new Set(prev).add(link));
  };

  useEffect(() => {
    const nicknames = {};
    const img = {};
    chatUsers.forEach((user) => {
      nicknames[user.userId] = user.nickname;
      img[user.userId] = user.profileImg;
    });
    setSenderNicknames(nicknames);
    setSenderProfileImgs(img);
  }, [chatUsers]);

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
          (message.senderId !== senderId && message.type == 'text') ||
          (message.type == 'img' &&
            index === 0 &&
            message.sendAt !== messages[index - 1]?.sendAt);

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
                      src={senderProfileImgs[message.senderId] || profile}
                      alt="프로필"
                      width={40}
                      height={40}
                      className="border rounded-full"
                    />
                  )}
                </div>
                <div>
                  {message.senderId !== senderId && (
                    <div className="text-sm mb-[4px]">
                      {senderNicknames[message.senderId]}
                    </div>
                  )}

                  <div
                    className={`max-w-[100%] p-3 rounded-lg ${message.senderId === senderId ? 'bg-gray--100' : 'bg-blue--500 text-white'}`}
                  >
                    {renderMessageContent(message)}
                  </div>
                </div>
                <div className="flex items-end">
                  <div>
                    <div
                      className={`text-xs text-blue--500 ${getMessageTime({ index, messages }) ? 'mt-3' : 'mt-7'}  flex items-end ${message.senderId === senderId ? 'justify-end mr-[10px]' : 'ml-[10px]'}`}
                    >
                      {message.unreadCount !== 0
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

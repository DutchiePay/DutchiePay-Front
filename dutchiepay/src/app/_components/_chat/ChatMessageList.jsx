import Image from 'next/image';
import { useState } from 'react';

const ChatMessageList = ({ messages, senderId }) => {
  const [clickedLinks, setClickedLinks] = useState(new Set());

  const handleLinkClick = (link) => {
    setClickedLinks((prev) => new Set(prev).add(link));
  };

  const renderMessageContent = (message) => {
    if (message.type === 'img') {
      return (
        <a href={message.content} target="_blank" rel="noopener noreferrer">
          <Image src={message.senderProfileImg} alt="사진" />
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

  return (
    <div className="flex-1 px-4 overflow-y-auto scrollable bg-white">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex flex-col ${message.senderId === senderId ? 'items-end' : 'items-start'}`}
        >
          {message.type === 'system' && (
            <div className="flex justify-center w-full">
              <h2 className="system-message-date w-full text-center">
                &nbsp;&nbsp;{message.date}&nbsp;&nbsp;
              </h2>
            </div>
          )}
          <div
            className={`flex ${message.senderId === senderId ? 'flex-row-reverse' : ''}`}
          >
            {message.senderId !== senderId && message.senderProfileImg && (
              <div className="flex flex-col items-center mr-2">
                <Image
                  src={message.senderProfileImg}
                  alt="프로필"
                  width={40}
                  height={40}
                  className="border rounded-full"
                />
              </div>
            )}
            <div>
              {message.senderId !== senderId && message.senderName && (
                <div className="block text-sm mb-[4px]">
                  {message.senderName}
                </div>
              )}
              <div
                className={`inline-block max-w-[100%] p-3 rounded-lg shadow ${message.senderId === senderId ? 'bg-yellow--100' : 'bg-gray-200 text-black'}`}
              >
                {renderMessageContent(message)}
              </div>
            </div>
            <div
              className={`text-xs min-w-[50px] text-gray-500 mt-1 flex items-end ${message.senderId === senderId ? 'mr-[10px]' : 'ml-[10px]'}`}
            >
              {message.type === 'system' ? '' : message.sendAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;

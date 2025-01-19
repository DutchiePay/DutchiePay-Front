import Image from 'next/image';
import mart from '/public/image/mart.jpg';
import post from '/public/image/community/post.svg';
import chatIcon from '/public/image/chat/chat.svg';
export default function ChatItem({ chat, onContextMenu }) {
  return (
    <div
      className="p-3 flex border-b cursor-pointer hover:bg-gray-100 transition duration-200"
      onClick={() => {
        const chatInfo = {
          chatImg: chat.chatImg || (chat.type == 'group' ? mart : post),
          chatName: chat.chatName,
          chatRoomId: chat.chatRoomId,
          chatUser: chat.chatUser,
          lastChatTime: chat.lastChatTime,
          lastMsg: chat.lastMsg,
          type: chat.type,
          unreadCount: chat.unreadCount,
        };
        sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));
        window.location.href = `/chat?chatRoomId=${chat.chatRoomId}`;
      }}
      onContextMenu={(event) => onContextMenu(event, chat)}
    >
      <Image
        src={chat.chatImg || mart}
        alt="채팅방이미지"
        width={70}
        height={70}
        className="rounded-lg border"
      />
      <div className="p-3 w-[480px]">
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">{chat.chatName}</div>
          <div className="text-xs text-gray--500">{chat.lastChatTime}</div>
        </div>
        <div className="flex justify-between items-center relative max-w-[300px]">
          <div className="title--single-line">{chat.lastMsg}</div>
          {chat.unreadCount > 0 && (
            <div className="w-5 h-5 bg-red-500 rounded-full border border-white flex items-center justify-center text-white text-xs">
              {chat.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

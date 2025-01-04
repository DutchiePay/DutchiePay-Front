import '@/styles/commerce.css';
import '@/styles/globals.css';
import { useSelector } from 'react-redux';

import axios from 'axios';

export default function ChatButton({ postId, type }) {
  const access = useSelector((state) => state.login.access);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chat/join`,
        {
          postId: postId,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      console.log(response);

      // window.open(
      //   `/chat/?chatRoomId=${newChatRoomId}`,
      //   '채팅방',
      //   'width=480,height=750,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=yes'
      // );
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  return (
    <button
      className="w-full rounded-lg py-[12px] text-white font-bold bg-blue--500"
      onClick={handleClick}
    >
      채팅방으로 이동
    </button>
  );
}

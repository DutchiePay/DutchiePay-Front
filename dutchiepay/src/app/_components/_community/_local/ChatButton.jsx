import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function ChatButton({ postId, type }) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
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
      const chatInfo = {
        chatName: response.data.chatName,
        chatRoomId: response.data.chatRoomId,
        chatUser: response.data.chatUser,
      };
      sessionStorage.setItem('chatInfo', JSON.stringify(chatInfo));
      window.open(
        `/chat/?chatRoomId=${response.data.chatRoomId}`,
        '채팅방',
        'width=480,height=750,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=yes'
      );
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleClick();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else if (
        error.response.data.message === '이미 채팅방에 참여되어있습니다.'
      ) {
        alert('이미 채팅방에 참여되어있습니다.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
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

import axios from 'axios';
import { useCallback, useRef } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useLeaveChat = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const userId = useSelector((state) => state.login.user.userId);

  const handleLeaveChat = useCallback(
    async (chatRoomId) => {
      try {
        if (hasFetched.current) return;
        hasFetched.current = true;
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chat?chatRoomId=${chatRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
      } catch (error) {
        console.log(error);

        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await handleLeaveChat(chatRoomId);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    },
    [access, refreshAccessToken]
  );

  return { handleLeaveChat };
};

export default useLeaveChat;

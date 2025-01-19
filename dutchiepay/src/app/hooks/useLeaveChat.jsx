import axios from 'axios';
import { useCallback, useRef } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useLeaveChat = (onSuccess) => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);

  const handleLeaveChat = useCallback(
    async (chatRoomId) => {
      const confirmed = confirm('채팅방을 나가시겠습니까?');
      if (!confirmed) return false;

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

        alert('채팅방을 나가셨습니다');
        onSuccess(chatRoomId);
        hasFetched.current = false;
        return true;
      } catch (error) {
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
        hasFetched.current = false;
        return false;
      }
    },
    [access, refreshAccessToken, onSuccess]
  );

  return { handleLeaveChat };
};

export default useLeaveChat;

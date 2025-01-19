import axios from 'axios';
import { useCallback, useRef } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useKickMember = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);

  const handleKickMembers = useCallback(
    async (chatRoomId, userIds) => {
      try {
        if (hasFetched.current) return;
        hasFetched.current = true;

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chat/kick`,
          {
            chatRoomId: chatRoomId,
            userId: userIds,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        hasFetched.current = false;
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await handleKickMembers(chatRoomId, userIds);
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

  return { handleKickMembers };
};

export default useKickMember;

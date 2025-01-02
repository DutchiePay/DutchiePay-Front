import { useCallback } from 'react';
import axios from 'axios';
import useReissueToken from './useReissueToken';

const useDeleteChat = (access) => {
  const { refreshAccessToken } = useReissueToken();
  const deleteChat = useCallback(
    async (chatRoomId) => {
      if (confirm('정말 나가시겠습니까?')) {
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/chat?chatRoomId=${chatRoomId}`,
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );

          alert('채팅방에서 나가셨습니다.');
        } catch (error) {
          if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
            const reissueResponse = await refreshAccessToken();
            if (reissueResponse.success) {
              await deleteChat(chatRoomId);
            } else {
              alert(
                reissueResponse.message ||
                  '오류가 발생했습니다 다시 시도해주세요.'
              );
            }
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        }
      }
    },
    [access, refreshAccessToken]
  );

  return deleteChat;
};

export default useDeleteChat;

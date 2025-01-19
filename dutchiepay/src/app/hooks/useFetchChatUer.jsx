import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useFetchChatUser = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const [chatUsers, setChatUsers] = useState([]);

  const fetchChatUser = useCallback(
    async (chatRoomId) => {
      try {
        if (hasFetched.current) return;
        hasFetched.current = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/chat/users?chatRoomId=${chatRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setChatUsers(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchChatUser(chatRoomId);
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

  return { fetchChatUser, chatUsers };
};

export default useFetchChatUser;

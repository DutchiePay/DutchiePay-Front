import { useSelector } from 'react-redux';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';

const useHandleLinkClick = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();

  const handleLinkClick = async (noticeId) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notice`,
        {
          noticeId: noticeId,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleLinkClick(noticeId);
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return handleLinkClick;
};

export default useHandleLinkClick;

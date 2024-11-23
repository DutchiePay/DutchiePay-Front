import axios from 'axios';
import { useCallback } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useDeleteAsk = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const deleteAsk = useCallback(
    async (askId) => {
      const confirmed = confirm('작성한 문의를 삭제하시겠습니까?');
      if (!confirmed) return false;

      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/asks?askId=${askId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        alert('정상적으로 삭제되었습니다.');
        return true;
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          /*const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await deleteAsk(askId);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }*/
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        return false;
      }
    },
    [access]
  );
  return { deleteAsk };
};
export default useDeleteAsk;

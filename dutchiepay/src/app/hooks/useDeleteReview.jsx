// hooks/useDeleteReview.js

import axios from 'axios';
import { useCallback } from 'react';
import useReissueToken from './useReissueToken';
import { useSelector } from 'react-redux';

const useDeleteReview = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const deleteReview = useCallback(
    async (reviewId) => {
      const confirmed = confirm('작성한 리뷰를 삭제하시겠습니까?');
      if (!confirmed) return false; // 사용자가 취소한 경우 false 반환

      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews?reviewId=${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        alert('정상적으로 삭제되었습니다.');
        return true; // 삭제 성공
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          /*const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await deleteReview(reviewId);
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }*/
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        return false; // 삭제 실패
      }
    },
    [access]
  );

  return { deleteReview };
};

export default useDeleteReview;

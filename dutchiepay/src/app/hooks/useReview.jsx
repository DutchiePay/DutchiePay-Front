import { useSelector } from 'react-redux';
import axios from 'axios';
import useReissueToken from '@/app/hooks/useReissueToken';

const useReview = () => {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();

  const submitReview = async (data, reviewId, orderId) => {
    const method = reviewId ? axios.patch : axios.post;
    try {
      await method(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
        {
          ...(reviewId ? { reviewId } : { orderId }),
          content: data.content,
          rating: data.rating,
          reviewImg: data.images,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      return { success: true };
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          return await submitReview(data, reviewId, orderId);
        } else {
          throw new Error(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert(
          error.response.data.message ||
            '오류가 발생했습니다 다시 시도해주세요.'
        );
      }
    }
  };

  return { submitReview };
};

export default useReview;

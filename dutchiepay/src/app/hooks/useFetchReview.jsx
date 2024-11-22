import axios from 'axios';
import { useEffect } from 'react';
import useReissueToken from './useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function useFetchReview({ reviewId, setReviewInfo }) {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();
  const { refreshAccessToken } = useReissueToken();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews?reviewId=${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        setReviewInfo(response.data);
      } catch (error) {
        if (error.response.data.message === '후기 정보가 없습니다.') {
          alert('후기 정보를 찾을 수 없습니다. 메인으로 이동합니다.');
          router.push('/');
        } else if (
          error.response.data.message === '액세스 토큰이 만료되었습니다.'
        ) {
          /*const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchProduct();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }*/
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    if (reviewId) fetchProduct();
  }, [reviewId, access, setReviewInfo, router]);
}

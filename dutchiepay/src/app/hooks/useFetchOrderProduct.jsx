import axios from 'axios';
import { useEffect } from 'react';
import useReissueToken from './useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function useFetchOrderProduct({ buyId, setOrderInfo }) {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();
  const { refreshAccessToken } = useReissueToken();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/delivery?buyId=${buyId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setOrderInfo(response.data);
      } catch (error) {
        if (error.response.data.message === '마감된 상품입니다.') {
          alert(
            '상품 구매가 마감되어 주문하실 수 없습니다. 메인으로 이동합니다.'
          );
          router.push('/');
        } else if (
          error.response.data.message === '상품 정보를 찾을 수 없습니다.'
        ) {
          alert('잘못된 접근입니다. 메인으로 이동합니다.');
          router.push('/');
        } else if (
          error.response.data.message === '액세스 토큰이 만료되었습니다.'
        ) {
          /*const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchProduct(); // 재발급된 액세스 토큰 사용
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }*/
        } else alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (buyId) fetchProduct();
  }, [buyId, access, setOrderInfo, router]);
}

import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function useFetchOrderProduct({ buyId, setOrderInfo }) {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();

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
        if (error.data.message === '마감된 상품입니다.') {
          alert(
            '상품 구매가 마감되어 주문하실 수 없습니다. 메인으로 이동합니다.'
          );
          router.push('/');
        } else if (error.data.message === '상품 정보를 찾을 수 없습니다.') {
          alert('잘못된 접근입니다. 메인으로 이동합니다.');
          router.push('/');
        } else alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    if (buyId) fetchProduct();
  }, [buyId, access, setOrderInfo, router]);
}

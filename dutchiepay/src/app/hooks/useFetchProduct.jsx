import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useRetryFunction from './useRetryFunction';

export default function useFetchProduct({ buyId }) {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();
  const [product, setProduct] = useState([]);

  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce?buyId=${buyId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setProduct(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          //// 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
          //reissueTokenAndRetry(() => fetchProduct());
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    fetchProduct();
  }, [access, router, buyId]);
  return { product };
}

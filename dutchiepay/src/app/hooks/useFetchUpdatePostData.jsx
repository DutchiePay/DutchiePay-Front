import { useEffect, useRef } from 'react';

import axios from 'axios';
import useReissueToken from './useReissueToken';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function useFetchUpdatePostData({ id, setPost }) {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();
  const hasFetched = useRef(false);

  const { refreshAccessToken } = useReissueToken();
  useEffect(() => {
    const fetchProduct = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/free/${id}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        if (error.response.data.message === '작성자가 일치하지 않습니다.') {
          alert('게시글의 권한이 없습니다. 메인으로 돌아갑니다.');
          router.push('/');
        } else if (
          error.response.data.message === '액세스 토큰이 만료되었습니다.'
        ) {
          hasFetched.current = false;
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await fetchProduct();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          console.log(error);
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    if (id) fetchProduct();
  }, [id, setPost, access, router, refreshAccessToken]);
}

'use client';

import '@/styles/globals.css';

import axios from 'axios';

import useReissueToken from '@/app/hooks/useReissueToken';
import { useEffect, useRef, useState } from 'react';
import SimilarPostList from './SimilarPostList';
import HotPostList from './HotPostList';
import { useSelector } from 'react-redux';

export default function PostRecommend({ post }) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const [similarPost, setSimilarPost] = useState([]);
  const [hotPost, setHotPost] = useState([]);
  const hasFetched = useRef(false);
  const category = post.category || '';

  useEffect(() => {
    const fetchProduct = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/free/recommend?category=${category}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setHotPost(response.data.hot);
        setSimilarPost(response.data.recommends);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchProduct();
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
    };

    fetchProduct();
  }, [access, refreshAccessToken, category]);

  return (
    <section className="w-[290px] h-[750px] sticky top-[150px] pl-[24px] py-[40px] flex flex-col gap-[40px]">
      {similarPost.length > 0 && (
        <article>
          <h2 className="text-2xl font-bold">유사한 게시글</h2>
          <div className="flex flex-col gap-[12px] mt-[8px]">
            {similarPost.map((item, key) => (
              <SimilarPostList key={key} item={item} />
            ))}
          </div>
        </article>
      )}

      {hotPost.length > 0 && (
        <article>
          <h2 className="text-2xl font-bold">주간 HOT🔥 게시글</h2>
          <div className="flex flex-col gap-[12px] mt-[8px]">
            {hotPost.map((item, key) => (
              <HotPostList key={key} item={item} index={key + 1} />
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

'use client';
import '@/styles/mypage.css';
import '@/styles/globals.css';

import MypageFilter from '@/app/_components/_mypage/MypageFilter';
import MyPostList from '@/app/_components/_mypage/MyPostList';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Pagination from '@/app/_components/Pagination';
import review from '/public/image/nonItem/review.svg';
import Image from 'next/image';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function MyPost() {
  const [filter, setFilter] = useState('작성한 게시글');
  const nickname = useSelector((state) => state.login.user.nickname);
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  useEffect(() => {
    const type = filter === '작성한 게시글' ? 'post' : 'comment';
    const fetchPost = async (page) => {
      try {
        if (hasFetched.current) return;

        hasFetched.current = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/posts?type=${type}&page=${page}&limit=9`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setTotalItems(response.data.totalPost || 0);
        setPosts(response.data.posts);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchPost();
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

    fetchPost(activePage);
  }, [activePage, filter, access, refreshAccessToken]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setActivePage(1);
  };

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">활동내역</h1>
      <small>
        {nickname}님이 작성하고 댓글을 남긴 게시글을 확인할 수 있습니다.
      </small>
      <ul className="flex gap-[8px] my-[16px]">
        <MypageFilter
          filter={filter}
          setFilter={handleFilterChange}
          filterkey={'작성한 게시글'}
        />
        <MypageFilter
          filter={filter}
          setFilter={handleFilterChange}
          filterkey={'댓글 남긴 게시글'}
        />
      </ul>
      <section className="flex flex-wrap gap-[12px] mb-[40px]">
        {posts.length === 0 ? (
          <div className="mt-[20%] w-[100%] min-h-[140px] text-center">
            <Image
              src={review}
              alt="문의 내용 없음"
              width={40}
              height={40}
              className="pt-[32px] mx-auto"
            />
            <p className="my-[40px]">작성한 게시글이 없습니다.</p>
          </div>
        ) : (
          posts.map((item, index) => {
            return <MyPostList key={index} item={item} />;
          })
        )}
        {posts.length > 0 && (
          <div className="w-[720px]">
            {
              <Pagination
                activePage={activePage}
                totalItems={totalItems}
                limit={9}
                onPageChange={handlePageChange}
                mypost={true}
              />
            }
          </div>
        )}
      </section>
    </section>
  );
}

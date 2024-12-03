'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import MypageFilter from '@/app/_components/_mypage/MypageFilter';
import Post from '@/app/_components/Post';
import { useSelector } from 'react-redux';
import { useState } from 'react';

// 작성 게시글 없을 때 UI도 구현해야 함
export default function MyPost() {
  const [filter, setFilter] = useState('작성한 게시글');
  const nickname = useSelector((state) => state.login.user.nickname);

  return (
    <section className="ml-[250px] px-[40px] py-[30px] min-h-[750px]">
      <h1 className="text-[32px] font-bold">활동내역</h1>
      <small>
        {nickname}님이 작성하고 댓글을 남긴 게시글을 확인할 수 있습니다.
      </small>
      <ul className="flex gap-[8px] my-[16px]">
        <MypageFilter
          filter={filter}
          setFilter={setFilter}
          filterkey={'작성한 게시글'}
        />
        <MypageFilter
          filter={filter}
          setFilter={setFilter}
          filterkey={'댓글 남긴 게시글'}
        />
      </ul>
      <section className="flex flex-wrap gap-[12px] mb-[40px]">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
    </section>
  );
}

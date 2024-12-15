import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Post_Complete from '../CompletePost';
import axios from 'axios';
import profile from '/public/image/profile.jpg';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function CurrentPost({ writerId, writerProfileImage, writer }) {
  const { refreshAccessToken } = useReissueToken();
  const hasFetched = useRef(false);
  const [currentPost, setCurrentPost] = useState([]);
  const access = useSelector((state) => state.login.access);

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        if (hasFetched.current) return;

        hasFetched.current = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recent-post?userId=${writerId}`,
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setCurrentPost(response.data);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          hasFetched.current = false;
          if (reissueResponse.success) {
            await fetchCurrentPost();
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

    fetchCurrentPost();
  }, [writerId, access, refreshAccessToken]);

  return (
    <div className="border rounded-lg px-[32px] py-[16px] mt-[24px]">
      <div className="flex items-center gap-[4px] mb-[4px] pb-[4px] border-b-2 border-blue--500">
        <div className="w-[20px] h-[20px] border rounded-full relative">
          <Image
            className="w-[20px] h-[20px] rounded-full object-cover"
            src={writerProfileImage || profile}
            alt={`${writer} 프로필`}
            fill
          />
        </div>
        <h2 className="font-bold">{writer}님의 최근 거래 완료글</h2>
      </div>
      <div className="flex flex-col gap-[8px] mt-[12px]">
        {currentPost.map((post, key) => {
          return <Post_Complete post={post} key={key} />;
        })}
      </div>
    </div>
  );
}

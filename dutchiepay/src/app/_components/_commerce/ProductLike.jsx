'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import axios from 'axios';
import fullheart from '/public/image/fullheart.svg';
import heart from '/public/image/heart.svg';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useRetryFunction from '@/app/hooks/useRetryFunction';

export default function ProductLike({ isLiked, productId, size }) {
  const access = useSelector((state) => state.login.access);
  const [isProductLiked, setIsProductLiked] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  useEffect(() => {
    setIsProductLiked(isLiked);
  }, [isLiked]);

  const handleIsLiked = async (e) => {
    e.preventDefault(); // Link 동작하지 않도록 함
    e.stopPropagation(); // Link로 전파되지 않도록 함

    if (!access) {
      router.push('/login');
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/commerce`,
        { buyId: productId },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      setIsProductLiked(!isProductLiked);
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        // 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
        reissueTokenAndRetry(() => handleIsLiked(e));
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <Image
        className="cursor-pointer"
        onClick={handleIsLiked}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={isHovered || isProductLiked ? fullheart : heart}
        alt="좋아요"
        width={size}
        height={size}
      />
    </>
  );
}

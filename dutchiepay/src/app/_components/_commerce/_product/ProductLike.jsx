'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Image from 'next/image';
import axios from 'axios';
import fullheart from '/public/image/fullheart.svg';
import heart from '/public/image/heart.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function ProductLike({ isLiked, productId }) {
  const access = useSelector((state) => state.login.access);
  const [isProductLiked, setIsProductLiked] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);

  const handleIsLiked = async (e) => {
    e.preventDefault(); // Link 동작하지 않도록 함
    e.stopPropagation(); // Link로 전파되지 않도록 함

    /*await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commerce`,
      { buyPostId: productId },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );*/

    setIsProductLiked(!isProductLiked);
  };

  return (
    <>
      <Image
        className={`cursor-pointer transition-transform duration-500 ease-in-out 
            ${isHovered || isProductLiked ? 'scale-110' : 'scale-100'}`}
        onClick={handleIsLiked}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        src={isHovered || isProductLiked ? fullheart : heart}
        alt="좋아요"
        width={22}
        height={22}
      />
    </>
  );
}

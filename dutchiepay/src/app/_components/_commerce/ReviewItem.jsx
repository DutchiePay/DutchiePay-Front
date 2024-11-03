'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import ImagesModal from '../../(modals)/images/page';
import Link from 'next/link';

import Rating from '../_rating/Rating';
import images from '/public/image/images.svg';
import more from '/public/image/more.svg';

import { useState, useEffect } from 'react';
import getFormatDate from '@/app/_util/getFormatDate';

export default function ReviewItem({ className, item, isAll }) {
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 초기값을 false로 설정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const isReview = 'review';
  const thumbnails = item.reviewImg;
  console.log(isMore);

  useEffect(() => {
    // 리뷰 이미지가 있는 경우에만 hasImages를 true로 설정
    setHasImages(item.reviewImg.length > 0);
  }, [item.reviewImg]);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggle = () => {
    setIsMore((prev) => !prev);
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤을 막음
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 스크롤을 복원
      document.body.style.overflow = 'auto';
    }
    // 컴포넌트 언마운트 시에도 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <ImagesModal onClose={handleCloseModal} thumbnails={thumbnails} />
      )}
      <div
        className={`w-[1020px] p-[20px] flex gap-[12px] relative ${className}`}
      >
        {hasImages && (
          <div className="relative w-[120px] h-[120px]">
            <Image
              className="rounded-lg object-cover"
              src={item.reviewImg[0]}
              alt="애슐리 볶음밥"
              fill
            />
            {item.reviewImg.length > 1 && (
              <div
                className="absolute bottom-[8px] right-[8px] bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer"
                onClick={handleImageClick}
              >
                <Image
                  className="opacity-80"
                  src={images}
                  width={20}
                  height={20}
                  alt="이미지 더보기"
                />
              </div>
            )}
          </div>
        )}

        <div className="w-[1000px]">
          <div className="flex justify-between">
            <strong className="text-lg">{item.nickname}</strong>
            <Rating rating={item.rating} size={20} />
          </div>
          <p className="text-xs text-gray--600">
            {getFormatDate(isReview, item.createdAt)}
          </p>
          <p
            className={`text-sm max-w-[920px] mt-[4px] ${isMore ? 'cursor-pointer' : 'mypage-reviews__review'}`}
            onClick={handleToggle}
          >
            {item.content}
          </p>
        </div>

        {/* 내용이 길 때만 "더보기" 아이콘 표시 */}
        {isMore && item.content.length > 200 && (
          <Image
            className={`w-[20px] h-[20px] absolute bottom-[8px] right-[20px] cursor-pointer ${isMore ? 'rotate-180' : ''}`}
            src={more}
            alt="more"
            width={20}
            height={20}
            onClick={handleToggle}
          />
        )}
      </div>
    </>
  );
}

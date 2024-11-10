'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import ImagesModal from '@/app/(modals)/images/page';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/app/_components/_rating/Rating';
import images from '../../../../public/image/images.svg';
import more from '../../../../public/image/more.svg';

export default function MyReviews({ item }) {
  const [hasImages, setHasImages] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnails = item.reviewImg;
  const contentRef = useRef();

  useEffect(() => {
    // 리뷰 이미지가 있는 경우에만 hasImages를 true로 설정
    setHasImages(thumbnails.length > 0);
  }, [thumbnails]);

  const handleToggle = () => {
    setIsMore((prev) => !prev);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [isMore]);

  return (
    <>
      {isModalOpen && (
        <ImagesModal onClose={handleCloseModal} thumbnails={thumbnails} />
      )}

      <div
        className="w-[730px] border rounded-lg p-[20px] flex gap-[12px] relative"
        key={item.reviewId}
      >
        {hasImages && (
          <div className="relative w-[120px] h-[120px]">
            <Image
              className="rounded-lg object-cover"
              src={item.reviewImg[0]} // 첫 번째 이미지 사용
              alt="리뷰 이미지"
              fill
            />

            {thumbnails?.length > 1 && (
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
        <div className={`${hasImages ? 'w-[558px]' : 'w-[730px]'}`}>
          <div className="flex justify-between items-center">
            <Link
              href={`/commerce/detail?productId=${item.buyId}`}
              className="inline-block max-w-[470px] title--single-line font-bold"
            >
              {item.productName}
            </Link>
            <div className="flex gap-[12px]">
              {item.isPossible && (
                <button className="text-sm font-semibold">수정</button>
              )}
              <button className="text-sm font-semibold">삭제</button>
            </div>
          </div>
          <div className="flex justify-between mt-[4px]">
            <Rating rating={item.rating} size={15} />
            <p className="text-xs text-gray--600">{item.createdAt}</p>
          </div>
          <p
            ref={contentRef}
            className={`text-sm w-[510px] mt-[12px] ${isMore ? '' : 'mypage-reviews__review'}`}
            onClick={handleToggle}
          >
            {item.content}
          </p>
          {/* 내용이 넘칠 때만 "더보기" 아이콘 표시*/}
          {(hasOverflow || isMore) && (
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
      </div>
    </>
  );
}

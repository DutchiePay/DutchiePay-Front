'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import arrow from '../../../../public/image/arrowWhite.svg';
import close from '../../../../public/image/close.svg';
import review1 from '../../../../public/image/reviewImg/reviewImg1.jpg';
import review2 from '../../../../public/image/reviewImg/reviewImg2.jpg';
import review3 from '../../../../public/image/reviewImg/reviewImg3.jpg';
import review4 from '../../../../public/image/reviewImg/reviewImg4.jpg';
import review5 from '../../../../public/image/reviewImg/reviewImg5.jpg';
import review6 from '../../../../public/image/product_detail.jpg';
export const thumbnails = [review1, review2, review3, review4, review6];

export default function ImagesModal({ onClose }) {
  const [currentImage, setCurrentImage] = useState(review1);

  const handleNextImage = () => {
    const currentIndex = thumbnails.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % thumbnails.length;
    setCurrentImage(thumbnails[nextIndex]);
  };

  const handlePreviousImage = () => {
    const currentIndex = thumbnails.indexOf(currentImage);
    const prevIndex =
      (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    setCurrentImage(thumbnails[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePreviousImage();
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImage, handleNextImage, handlePreviousImage]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
      <div
        className="relative w-[830px] h-[400px] rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage}
          layout="fill"
          objectFit="contain"
          alt="현재 이미지"
        />
      </div>

      <button
        onClick={handlePreviousImage}
        className="absolute left-[150px] top-1/2 transform -translate-y-1/2"
        aria-label="이전 이미지"
      >
        <Image
          src={arrow}
          width={20}
          height={20}
          className="rotate-180"
          alt="왼쪽 화살표"
        />
      </button>

      <button
        onClick={handleNextImage}
        className="absolute right-[150px] top-1/2 transform -translate-y-1/2"
        aria-label="다음 이미지"
      >
        <Image src={arrow} width={20} height={20} alt="오른쪽 화살표" />
      </button>

      <div className="mt-4 flex gap-2 justify-center">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className="relative w-[60px] h-[60px] cursor-pointer"
            onClick={() => setCurrentImage(thumbnail)}
          >
            <Image
              src={thumbnail}
              layout="fill"
              objectFit="cover"
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-10"
        aria-label="닫기"
      >
        <Image src={close} width={24} height={24} alt="닫기 버튼" />
      </button>
    </div>
  );
}

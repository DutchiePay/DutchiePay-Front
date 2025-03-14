'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import arrow from '/public/image/arrowWhite.svg';
import close from '/public/image/close.svg';

export default function ImagesModal({ onClose, thumbnails }) {
  const [currentImage, setCurrentImage] = useState(thumbnails[0]); // 초기 이미지를 썸네일의 첫 번째로 설정

  const handleNextImage = useCallback(() => {
    const currentIndex = thumbnails.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % thumbnails.length;
    setCurrentImage(thumbnails[nextIndex]);
  }, [currentImage, thumbnails]);

  const handlePreviousImage = useCallback(() => {
    const currentIndex = thumbnails.indexOf(currentImage);
    const prevIndex =
      (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    setCurrentImage(thumbnails[prevIndex]);
  }, [currentImage, thumbnails]);

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
  }, [handleNextImage, handlePreviousImage]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
      <div
        className="relative w-[830px] h-[830px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={currentImage} fill objectFit="contain" alt="현재 이미지" />
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
          <Image
            key={index}
            className="relative w-[60px] h-[60px] cursor-pointer object-cover"
            src={thumbnail}
            width={60}
            height={60}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentImage(thumbnail)}
          />
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

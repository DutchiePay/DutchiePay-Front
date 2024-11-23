'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import Image from 'next/image';
import ImagesModal from '@/app/(modals)/images/page';
import Link from 'next/link';
import Rating from '@/app/_components/_rating/Rating';
import images from '/public/image/images.svg';
import more from '/public/image/more.svg';
import useDeleteReview from '@/app/hooks/useDeleteReview';
import useReviewDisplay from '@/app/hooks/useReviewDisplay';
import ReviewDetails from '../_commerce/_review/ReviewDetails';

export default function MyReviews({ item, onDelete }) {
  const { deleteReview } = useDeleteReview();

  const handleDelete = async () => {
    await deleteReview(item.reviewId);
    onDelete(item.reviewId);
  };

  const {
    hasImages,
    isModalOpen,
    isMore,
    hasOverflow,
    contentRef,
    handleToggle,
    handleImageClick,
    handleCloseModal,
  } = useReviewDisplay(item.reviewImg);

  return (
    <>
      {isModalOpen && (
        <ImagesModal onClose={handleCloseModal} thumbnails={item.reviewImg} />
      )}

      <div
        className="w-[730px] border rounded-lg p-[20px] flex gap-[12px] relative"
        key={item.reviewId}
      >
        {hasImages && (
          <div className="relative w-[120px] h-[120px]">
            <Image
              className="rounded-lg object-cover"
              src={item.reviewImg[0]}
              alt="리뷰 이미지"
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
        <div className={`${hasImages ? 'w-[558px]' : 'w-[730px]'}`}>
          <ReviewDetails item={item} onDelete={handleDelete} />
          <div className="flex justify-between mt-[4px]">
            <Rating rating={item.rating} size={15} />
            <p className="text-xs text-gray--600">{item.createdAt}</p>
          </div>
          <p
            ref={contentRef}
            className={`text-sm w-[510px] mt-[12px] ${isMore ? '' : 'mypage-reviews__review'}`}
            onClick={hasOverflow ? handleToggle : undefined}
          >
            {item.content}
          </p>
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

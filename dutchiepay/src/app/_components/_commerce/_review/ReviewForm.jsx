import React, { useEffect } from 'react';

import getImage from '@/app/_util/getImage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewRatingSection from './ReviewRatingSection';
import ReviewImageUploadSection from './ReviewImageUploadSection';
import ReviewTextareaSection from './ReviewTextareaSection';

const ReviewForm = ({
  onImageDelete,
  reviewId,
  orderId,
  initialContent,
  initialImages,
  initialRating,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      content: initialContent || '',
      rating: initialRating || 0,
      images: initialImages || [],
    },
  });

  const images = watch('images');
  const rating = watch('rating') || 0;
  const access = useSelector((state) => state.login.access);

  useEffect(() => {
    setValue('content', initialContent);
    setValue('images', initialImages);
    setValue('rating', initialRating);
  }, [initialContent, initialImages, initialRating, setValue]);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    if (images.length >= 5) {
      alert('이미지는 최대 5장까지 등록할 수 있습니다.');
      return;
    }

    const imageUrl = await getImage(imageFile);
    if (imageUrl) {
      setValue('images', [...images, imageUrl]);
    }
  };
  const handleReviewSubmission = async (data) => {
    const method = reviewId ? axios.patch : axios.post;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`;

    try {
      await method(
        url,
        {
          ...(reviewId ? { reviewId } : { orderId }),
          content: data.content,
          rating: data.rating,
          reviewImg: data.images,
        },
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );

      alert(`후기가 성공적으로 ${reviewId ? '변경' : '제출'}되었습니다.`);
      window.opener.postMessage('refreshReviews', '*');
      window.close();
    } catch (error) {
      const messageMap = {
        '액세스 토큰이 만료되었습니다.':
          '토큰이 만료되었습니다. 다시 로그인해주세요.',
        '리뷰 수정은 2회까지만 가능합니다.': '리뷰 수정은 2회까지만 가능합니다',
        '리뷰 내용을 입력해주세요.': '리뷰 내용을 입력해주세요.',
        '평점을 입력해주세요.': '평점을 입력해주세요.',
        '작성한 상품 리뷰가 이미 존재합니다.':
          '작성한 상품 리뷰가 이미 존재합니다.',
        '주문 정보가 없습니다.': '주문 정보가 없습니다.',
        '자신이 구매한 상품에만 후기를 달 수 있습니다.':
          '자신이 구매한 상품에만 후기를 달 수 있습니다.',
      };
      alert(
        messageMap[error.response.data.message] ||
          '오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
  };
  const onFormSubmit = (data) => {
    if (data.rating === 0) {
      alert('별점을 선택해 주세요.');
      return;
    }
    handleReviewSubmission(data);
  };

  return (
    <div className="mt-[12px]">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-[24px]"
      >
        <ReviewRatingSection
          initialRating={initialRating}
          onRatingChange={(rating) => setValue('rating', rating)}
          rating={rating}
        />
        <ReviewImageUploadSection
          images={images}
          onImageUpload={handleImageUpload}
          onImageDelete={onImageDelete}
        />
        <ReviewTextareaSection register={register} />
        <div className="flex justify-center gap-[24px] mt-[24px]">
          <button
            className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]"
            type="submit"
          >
            후기 {reviewId ? '수정' : '작성'}
          </button>
          <button
            className="text-blue--500 text-sm border border-blue--500 rounded-lg px-[24px] py-[8px]"
            type="button"
            onClick={() => window.close()}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;

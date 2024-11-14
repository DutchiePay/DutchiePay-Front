import React, { useEffect } from 'react';

import getImage from '@/app/_util/getImage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewRating from '@/app/_components/_commerce/_review/ReviewRating';
import ReviewImageUpload from '@/app/_components/_commerce/_review/ReviewImageUpload';
import ReviewTextarea from '@/app/_components/_commerce/_review/ReviewTextarea';
import { ERROR_MESSAGES } from '@/app/_util/constants';
import PopUpButton from '@/app/_components/PopUpButton';

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
    try {
      await method(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
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
      const errorMessage =
        ERROR_MESSAGES[error.response.data.message] ||
        '오류가 발생했습니다. 다시 시도해주세요.';
      alert(errorMessage);
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
        <ReviewRating
          initialRating={initialRating}
          onRatingChange={(rating) => setValue('rating', rating)}
          rating={rating}
        />
        <ReviewImageUpload
          images={images}
          onImageUpload={handleImageUpload}
          onImageDelete={onImageDelete}
        />
        <ReviewTextarea register={register} />
        <PopUpButton submitText={`후기 ${reviewId ? '수정' : '작성'}`} />
      </form>
    </div>
  );
};

export default ReviewForm;

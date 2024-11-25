import React, { useEffect } from 'react';

import getImage from '@/app/_util/getImage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReviewRating from '@/app/_components/_commerce/_review/ReviewRating';
import ReviewImageUpload from '@/app/_components/_commerce/_review/ReviewImageUpload';
import ReviewTextarea from '@/app/_components/_commerce/_review/ReviewTextarea';
import PopUpButton from '@/app/_components/PopUpButton';
import useReissueToken from '@/app/hooks/useReissueToken';
import useReview from '@/app/hooks/useReview';

const ReviewForm = ({
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
  const { submitReview } = useReview();
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
  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setValue('images', updatedImages);
  };
  const onFormSubmit = async (data) => {
    if (data.rating === 0) {
      alert('별점을 선택해 주세요.');
      return;
    }
    try {
      await submitReview(data, reviewId, orderId);
      alert(`후기가 성공적으로 ${reviewId ? '변경' : '제출'}되었습니다.`);
      window.opener.postMessage(
        { type: 'REFRESH_REVIEW' },
        window.location.origin
      );
      window.close();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleReviewSubmission(data);
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다 다시 시도해주세요.'
          );
        }
      } else {
        alert(
          error.response.data.message ||
            '오류가 발생했습니다 다시 시도해주세요.'
        );
      }
    }
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
          onImageDelete={handleImageDelete}
        />
        <ReviewTextarea register={register} />
        <PopUpButton submitText={`후기 ${reviewId ? '수정' : '작성'}`} />
      </form>
    </div>
  );
};

export default ReviewForm;

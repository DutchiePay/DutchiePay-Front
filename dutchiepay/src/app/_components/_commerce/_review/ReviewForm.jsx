import React, { useEffect } from 'react';
import Image from 'next/image';
import RatingDragger from '@/app/_components/_rating/RatingDragger';
import camera from '/public/image/camera.svg';
import getImage from '@/app/_util/getImage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';

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

  const handleCreateReview = async (data) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
        {
          orderId: orderId,
          content: data.content,
          rating: data.rating,
          reviewImg: data.images,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('후기가 성공적으로 제출되었습니다.');
      window.opener.postMessage('refreshReviews', '*');
      window.close(); // 창 닫기
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUpdateReview = async (data) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
        {
          reviewId: reviewId,
          content: data.content,
          rating: data.rating,
          reviewImg: data.images,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('후기가 성공적으로 변경되었습니다.');
      window.opener.postMessage('refreshReviews', '*');
      window.close(); // 창 닫기
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error) => {
    if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
    } else if (
      error.response.data.message === '리뷰 수정은 2회까지만 가능합니다.'
    ) {
      alert('리뷰 수정은 2회까지만 가능합니다');
      window.close();
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const onFormSubmit = (data) => {
    if (reviewId) {
      handleUpdateReview(data); // 수정일 경우
    } else {
      handleCreateReview(data); // 새로 작성일 경우
    }
  };

  const closeWindow = () => {
    window.close();
  };

  return (
    <div className="mt-[12px]">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-[24px]"
      >
        <div>
          <div className="flex items-baseline gap-[8px]">
            <strong className="text-blue--500 font-semibold">만족도</strong>
            <p className="text-xs text-gray--500">
              별을 드래그 또는 클릭해주세요. 정수 단위로만 입력 가능합니다.
            </p>
          </div>
          <div className="mt-[4px] flex items-center gap-[16px]">
            <RatingDragger
              onRatingChange={(rating) => setValue('rating', rating)}
              initialRating={initialRating}
            />
            <p className="text-sm text-gray--500">{watch('rating')}/5점</p>
          </div>
        </div>
        <div>
          <strong className="text-blue--500 font-semibold">
            이미지 (최대 5장까지 등록 가능)
          </strong>
          <div className="mt-[4px] flex items-center gap-[12px]">
            <label
              className="w-[70px] h-[70px] border flex flex-col justify-center items-center cursor-pointer"
              role="button"
            >
              <Image src={camera} alt="image upload" width={35} height={25} />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-xs text-gray--500">{images.length}/5</p>
            </label>
            {images.map((imgUrl, index) => (
              <div className="relative" key={index}>
                <Image
                  className="w-[70px] h-[70px] border"
                  src={imgUrl}
                  alt="review image"
                  width={70}
                  height={70}
                />
                <button
                  className="w-[15px] h-[15px] text-xs absolute top-0 right-0 bg-red--500 text-white text-center"
                  type="button"
                  onClick={() => {
                    const updatedImages = [...images];
                    updatedImages.splice(index, 1);
                    setValue('images', updatedImages);
                    onImageDelete(index);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <strong className="text-blue--500 font-semibold">후기</strong>
          <textarea
            {...register('content')}
            className="h-[250px] mt-[4px] text-sm border border-blue--500 rounded-lg p-[12px] outline-none resize-none"
            placeholder="후기를 작성해주세요."
            spellCheck="false"
          />
        </div>
        <p className="mt-[4px] text-xs text-red--500">
          클린한 리뷰 환경을 유지하기 위해 최초 등록 이후 30일간 2회의 추가
          수정이 가능합니다.
        </p>
        <div className="flex justify-center gap-[24px] mt-[24px]">
          <button
            className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]"
            type="submit"
          >
            후기 {reviewId ? '수정' : '작성'}
          </button>
          <button
            className="text-blue--500 text-sm border border-blue--500 rounded-lg px-[24px] py-[8px]"
            onClick={closeWindow}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;

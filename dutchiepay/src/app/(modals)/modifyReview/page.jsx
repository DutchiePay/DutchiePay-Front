'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import RatingDragger from '@/app/_components/_rating/RatingDragger';
import camera from '../../../../public/image/camera.svg';
import productDefault from '../../../../public/image/product1.jpg';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getImage from '@/app/_util/getImage';
import useFetchReview from '@/app/hooks/useFetchReview';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';

export default function ModifyReviewModal() {
  const access = useSelector((state) => state.login.access);
  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewId');
  const buyId = searchParams.get('buyId');
  const [reviewInfo, setReviewInfo] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  useFetchReview({ reviewId, setReviewInfo });
  useFetchOrderProduct({ buyId, setOrderInfo: setProductInfo });

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);

  // reviewInfo가 업데이트될 때 초기 데이터 바인딩
  useEffect(() => {
    if (reviewInfo) {
      setContent(reviewInfo.content);
      setImages(reviewInfo.reviewImg || []);
      setRating(reviewInfo.rating);
    }
  }, [reviewInfo]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const closeWindow = () => {
    window.close();
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    if (images.length >= 5) {
      alert('이미지는 최대 5장까지 등록할 수 있습니다.');
      return;
    }

    const imageUrl = await getImage(imageFile);
    if (imageUrl) {
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
  };
  console.log(reviewInfo);

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/reviews`,
        {
          reviewId: reviewInfo.reviewId,
          content: content,
          rating: rating,
          reviewImg: images,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('후기가 성공적으로 변경되었습니다.');
      closeWindow();
    } catch (error) {
      console.log(error);
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      } else if (
        error.response.data.message === '리뷰 수정은 2회까지만 가능합니다.'
      ) {
        alert('수정이 불가능한 상태입니다.');
        closeWindow();
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">후기 수정</h1>
      <p className="text-xs text-gray--500">
        제품을 이용하시면서 좋았던 점, 불편하셨던 점 등을 공유해주시면 다른
        고객들에게 도움이 됩니다.
      </p>
      <section className="mt-[40px]">
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded-lg"
            src={productInfo?.productImg || productDefault}
            alt={productInfo?.productName || '제품 이미지'}
            width={100}
            height={100}
          />
          <div className="flex flex-col w-[400px] gap-[4px]">
            <p className="text-xs text-gray--500">{reviewInfo?.storeName}</p>
            <strong className="title--multi-line">
              {reviewInfo?.productName}
            </strong>
          </div>
        </div>
        <hr />
        <div className="mt-[12px]">
          <div className="flex flex-col gap-[24px]">
            <div>
              <div className="flex items-baseline gap-[8px]">
                <strong className="text-blue--500 font-semibold">만족도</strong>
                <p className="text-xs text-gray--500">
                  별을 드래그 또는 클릭해주세요. 정수 단위로만 입력 가능합니다.
                </p>
              </div>
              <div className="mt-[4px] flex items-center gap-[16px]">
                <RatingDragger
                  onRatingChange={handleRatingChange}
                  initialRating={rating} // 여기서 초기값 전달
                />
                <p className="text-sm text-gray--500">{rating}/5점</p>
              </div>
            </div>
            <div>
              <strong className="text-blue--500 font-semibold">
                이미지 (최대 5장까지 등록 가능)
              </strong>
              <div className="mt-[4px] flex items-center gap-[12px]">
                <label className="w-[70px] h-[70px] border flex flex-col justify-center items-center cursor-pointer">
                  <Image
                    src={camera}
                    alt="image upload"
                    width={35}
                    height={25}
                  />
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
                      onClick={() => handleImageDelete(index)}
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
                className="h-[250px] mt-[4px] text-sm border border-blue--500 rounded-lg p-[12px] outline-none resize-none"
                placeholder="후기를 작성해주세요."
                spellCheck="false"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <p className="mt-[4px] text-xs text-red--500">
            클린한 리뷰 환경을 유지하기 위해 최초 등록 이후 30일간 2회의 추가
            수정이 가능합니다.
          </p>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button
              className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]"
              onClick={handleSubmit}
            >
              후기 수정
            </button>
            <button
              className="text-blue--500 text-sm border border-blue--500 rounded-lg px-[24px] py-[8px]"
              onClick={closeWindow}
            >
              취소
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

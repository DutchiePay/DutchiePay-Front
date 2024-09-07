'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import RatingDragger from '@/app/_components/_rating/RatingDragger';
import camera from '../../../../public/image/camera.svg';
import product from '../../../../public/image/product1.jpg';
import review1 from '../../../../public/image/reviewImg/reviewImg1.jpg';
import review2 from '../../../../public/image/reviewImg/reviewImg2.jpg';
import review3 from '../../../../public/image/reviewImg/reviewImg3.jpg';
import review4 from '../../../../public/image/reviewImg/reviewImg4.jpg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ReviewModal() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const [images, setImages] = useState([review1, review2, review3, review4]);
  const [rating, setRating] = useState(0);

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

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">후기 작성</h1>
      <p className="text-xs text-gray--500">
        제품을 이용하시면서 좋았던 점, 불편하셨던 점 등을 공유해주시면 다른
        고객들에게 도움이 됩니다. <br />
      </p>
      <section className="mt-[40px]">
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded-lg"
            src={product}
            alt="애슐리 볶음밥"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-[400px] gap-[4px]">
            <p className="text-xs text-gray--500">(주)이랜드팜앤푸드(서울)</p>
            <strong className="title--multi-line">
              애슐리 볶음밥 10인분 혼합 구성
              10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
              대용 직장인 도시락
            </strong>
            <p className="text-gray--500">24082412345</p>
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
                <RatingDragger onRatingChange={handleRatingChange} />
                <p className="text-sm text-gray--500">{rating}/5점</p>
              </div>
            </div>
            <div>
              <strong className="text-blue--500 font-semibold">
                이미지 (최대 5장까지 등록 가능)
              </strong>
              <div className="mt-[4px] flex items-center gap-[12px]">
                <button className="w-[70px] h-[70px] border flex flex-col justify-center items-center">
                  <Image
                    src={camera}
                    alt="image upload"
                    width={35}
                    height={25}
                  />
                  <p className="text-xs text-gray--500">2/5</p>
                </button>
                {images.map((item, index) => (
                  <div className="relative" key={index}>
                    <Image
                      className="w-[70px] h-[70px] border"
                      src={item}
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
              />
            </div>
          </div>
          <p className="mt-[4px] text-xs text-red--500">
            클린한 리뷰 환경을 유지하기 위해 최초 등록 이후 30일간 2회의 추가
            수정이 가능합니다. <br />
            (등록 가능 기간이 30일 미만일 경우 제외)
            <br />
          </p>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]">
              후기 등록
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

'use client';

import '@/styles/mypage.css';
import '@/styles/globals.css';

import ImagesModal, { thumbnails } from '@/app/(modals)/images/page';
import { useEffect, useState, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/app/_components/_rating/Rating';
import images from '../../../../public/image/images.svg';
import more from '../../../../public/image/more.svg';
import product from '../../../../public/image/product1.jpg';

export default function MyReviews() {
  const [isPossible, setIsPossible] = useState(true); // 삭제 가능 여부
  const [isMore, setIsMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleIsMore = (e) => {
    setIsMore(!isMore);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // 모달이 열릴 때 스크롤을 막음
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 스크롤을 복원
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트 언마운트 시에도 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  const imageStyle = useMemo(
    () => ({
      objectFit: 'cover',
    }),
    []
  );
  return (
    <>
      {isModalOpen && <ImagesModal onClose={handleCloseModal} />}
      <div className="w-[730px] border rounded-lg p-[20px] flex gap-[12px] relative">
        <div className="relative w-[120px] h-[120px] ">
          <Image
            className="rounded-lg"
            src={product}
            alt="애슐리 볶음밥"
            fill // 부모 div의 크기를 채움
            style={imageStyle}
          />

          {/* 이미지 위에 표시되는 '더보기' 아이콘 */}
          {thumbnails.length > 1 && (
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

        <div className="w-[558px]">
          <div className="flex justify-between items-center">
            <Link
              href="/commerce/detail?productId=123"
              className="inline-block max-w-[470px] title--single-line font-bold"
            >
              애슐리 볶음밥 10인분 혼합 구성
              10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
              대용 직장인 도시락
            </Link>
            <div className="flex gap-[12px]">
              {isPossible && (
                <button className="text-sm font-semibold">수정</button>
              )}
              <button className="text-sm font-semibold">삭제</button>
            </div>
          </div>
          <div className="flex justify-between mt-[4px]">
            <Rating rating={4} size={15} />
            <p className="text-xs text-gray--600">2024년 07월 14일</p>
          </div>
          <p
            className={`text-sm w-[510px] mt-[12px] ${isMore ? '' : 'mypage-reviews__review'}`}
          >
            이 제품은 정말 대박이에요! 사용하고 나서부터 생활이 편해졌어요.
            강추합니다! 이 제품은 정말 대박이에요! 사용하고 나서부터 생활이
            편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고 나서부터
            생활이 편해졌어요. 강추합니다!이 제품은 정말 대박이에요! 사용하고
            나서부터 생활이 편해졌어요. 강추합니다!
          </p>
        </div>
        <Image
          className={`w-[20px] h-[20px] absolute bottom-[8px] right-[20px] cursor-pointer ${isMore ? 'rotate-180' : ''}`}
          src={more}
          alt="more"
          width={20}
          height={20}
          onClick={(e) => handleIsMore(e)}
        />
      </div>
    </>
  );
}

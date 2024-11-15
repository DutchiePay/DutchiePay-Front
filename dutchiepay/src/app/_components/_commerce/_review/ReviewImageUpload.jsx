import React from 'react';
import Image from 'next/image';
import camera from '/public/image/camera.svg';

const ReviewImageUpload = ({ images, onImageUpload, onImageDelete }) => {
  return (
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
            onChange={onImageUpload}
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
              onClick={() => onImageDelete(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewImageUpload;

import Image from 'next/image';
import images from '/public/image/images.svg';

const ReviewImage = ({ reviewImg, onImageClick }) => {
  return (
    <div className="relative w-[120px] h-[120px]">
      <Image
        className="rounded-lg object-cover"
        src={reviewImg[0]} // 첫 번째 이미지 사용
        alt="리뷰 이미지"
        fill
      />
      {reviewImg.length > 1 && (
        <div
          className="absolute bottom-[8px] right-[8px] bg-white w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer"
          onClick={onImageClick}
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
  );
};

export default ReviewImage;

import Image from 'next/image';

export default function UploadedImages({ isThumbnail, images }) {
  return (
    <div className="w-full h-[100px] border-x border-b border-[#ccc] py-[8px] px-[12px]">
      <div className="flex gap-[4px] items-end">
        <p className="text-sm font-bold">이미지 ({images.length}/10)</p>
        <small className="text-xs text-gray--500">
          게시글의 메인 이미지로 사용할 대표 이미지를 선택해주세요.
        </small>
      </div>
      <div className="flex gap-[4px] mt-[4px]">
        {images.map((img, key) => {
          return (
            <div
              className="w-[60px] h-[60px] border relative object-cover"
              key={key}
            >
              <Image src={img} alt="첨부이미지" fill />
              {isThumbnail && (
                <div className="text-[10px] text-white bg-blue-500 py-[2px] px-[4px] absolute top-0 left-0">
                  대표
                </div>
              )}
              <button
                className="w-[15px] h-[15px] text-[10px] text-white font-medium bg-red-500 absolute top-0 right-0"
                type="button"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

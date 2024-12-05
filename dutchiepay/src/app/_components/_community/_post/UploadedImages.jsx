import Image from 'next/image';

export default function UploadedImages({
  quillRef,
  thumbnail,
  setThumbnail,
  images,
  setImages,
}) {
  const handleThumbnail = (img) => {
    if (thumbnail === img) return;
    setThumbnail(img);
  };

  const handleImageDelete = (img) => {
    if (img === thumbnail) {
      alert(
        '대표 이미지로 설정된 사진은 제거할 수 없습니다.\n삭제를 원할 경우 대표 이미지를 다른 이미지로 변경해주세요.'
      );
      return;
    }
    setImages((prevImages) => prevImages.filter((image) => image !== img));

    const quill = quillRef.current.getEditor();
    const delta = quill.getContents();

    const updatedDelta = delta.filter((op) => {
      if (op.insert && op.insert.image === img) {
        return false;
      }
      return true;
    });

    quill.setContents(updatedDelta);
  };

  return (
    <div className="w-full h-[100px] border-x border-b border-[#ccc] py-[8px] px-[12px]">
      <div className="flex gap-[4px] items-end">
        <p className="text-sm font-bold">이미지 ({images.length}/10)</p>
        <small className="text-xs text-gray--500">
          원하는 이미지를 클릭 시 대표이미지로 설정됩니다. X 버튼을 누를 경우,
          게시글에서 이미지가 제거됩니다.
        </small>
      </div>
      <div className="flex gap-[4px] mt-[4px]">
        {images.map((img, key) => {
          return (
            <div
              className="w-[60px] h-[60px] border relative object-cover"
              key={key}
            >
              <Image
                src={img}
                alt="첨부이미지"
                fill
                onClick={() => handleThumbnail(img)}
              />
              {thumbnail === img && (
                <div className="text-[10px] text-white bg-blue-500 py-[2px] px-[4px] absolute top-0 left-0">
                  대표
                </div>
              )}
              <button
                className="w-[15px] h-[15px] text-[10px] text-white font-medium bg-red-500 absolute top-0 right-0"
                type="button"
                onClick={() => handleImageDelete(img)}
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

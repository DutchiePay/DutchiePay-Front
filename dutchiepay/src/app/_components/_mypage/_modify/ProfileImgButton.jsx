'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

import getImage from '@/app/_util/GetImage';
import { useRef } from 'react';

export default function ProfileImgButton({ setModifyInfo }) {
  const imageRef = useRef(null);

  // 이미지 불러오기
  const hanldeImage = async (e) => {
    if (!e.target.value) return;
    const image = e.target.files[0];
    const uploaded = await getImage(image);
    if (uploaded) setModifyInfo({ profileImage: uploaded });
    e.target.value = ''; // 연속적으로 같은 값이 들어오도록 값을 비워줌
  };

  // 버튼 클릭 시 input 호출
  const handleUploadClick = (e) => {
    if (!imageRef.current) {
      return;
    }
    imageRef.current.click();
  };

  return (
    <div className="flex flex-col gap-[4px]">
      <button
        className="border rounded-lg text-sm px-[16px] py-[4px]"
        onClick={handleUploadClick}
      >
        프로필 변경
      </button>
      <input
        ref={imageRef}
        type="file"
        className="hidden"
        onChange={hanldeImage}
      />
      <button
        className="border rounded-lg text-sm px-[16px] py-[4px]"
        onClick={() => {
          setModifyInfo((prevState) => ({
            ...prevState,
            profileImage: null,
          }));
        }}
      >
        프로필 삭제
      </button>
    </div>
  );
}

'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import ProfileImgButton from './ProfileImgButton';
import axios from 'axios';
import profile from '/public/image/profile.jpg';
import { setUserInfoChange } from '@/redux/slice/loginSlice';
import { useState } from 'react';

export default function ModifyProfileImg({ modifyInfo, setModifyInfo }) {
  const profileImage = useSelector((state) => state.login.user.profileImage);
  const access = useSelector((state) => state.login.access);
  const [isModify, setIsModify] = useState(false);
  const dispatch = useDispatch();

  const handleModifyCancel = () => {
    setModifyInfo((prevModifyInfo) => ({
      ...prevModifyInfo,
      profileImage: profileImage,
    }));
    setIsModify(false);
  };

  const handleModifyComplete = async () => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/image`,
        { profileImg: modifyInfo.profileImage },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      dispatch(setUserInfoChange({ profileImage: modifyInfo.profileImage }));
      setIsModify(false);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <article className="mypage-profile">
      <div className="flex items-center">
        <h2 className="mypage-profile__label">
          프로필
          <br />
          이미지
        </h2>
        <div className="flex gap-[24px] items-center">
          <div className="relative w-[150px] h-[150px] mb-[12px]">
            <Image
              className="rounded-full border"
              src={modifyInfo.profileImage || profile}
              alt="profile"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          {isModify && <ProfileImgButton setModifyInfo={setModifyInfo} />}
        </div>
      </div>
      <div className="flex gap-[12px]">
        {isModify && (
          <button
            className="mypage-profile__button"
            onClick={handleModifyCancel}
          >
            변경취소
          </button>
        )}
        <button
          className={`mypage-profile__button ${isModify && 'mypage-profile__button-finish'}`}
          onClick={() =>
            isModify ? handleModifyComplete() : setIsModify(!isModify)
          }
        >
          {isModify ? '변경완료' : '변경'}
        </button>
      </div>
    </article>
  );
}

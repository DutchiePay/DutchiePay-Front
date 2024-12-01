'use client';

import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import axios from 'axios';
import dynamic from 'next/dynamic';
import profile from '/public/image/profile.jpg';
import { setUserInfoChange } from '@/redux/slice/loginSlice';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useState } from 'react';

const ProfileImgButton = dynamic(() => import('./ProfileImgButton'));

export default function ModifyProfileImg({ modifyInfo, setModifyInfo }) {
  const profileImage = useSelector((state) => state.login.user.profileImage);
  const access = useSelector((state) => state.login.access);
  const [isModify, setIsModify] = useState(false);
  const dispatch = useDispatch();
  const { refreshAccessToken } = useReissueToken();
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
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        const reissueResponse = await refreshAccessToken();
        if (reissueResponse.success) {
          await handleModifyComplete();
        } else {
          alert(
            reissueResponse.message || '오류가 발생했습니다. 다시 시도해주세요.'
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <article className="flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="w-[130px] font-semibold text-2xl">
          프로필
          <br />
          이미지
        </h2>
        <div className="flex gap-[24px] items-center">
          <div className="relative w-[150px] h-[150px] mb-[12px]">
            <Image
              className="rounded-full border object-cover"
              src={modifyInfo.profileImage || profile}
              alt="profile"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {isModify && <ProfileImgButton setModifyInfo={setModifyInfo} />}
        </div>
      </div>
      <div className="flex gap-[12px]">
        {isModify && (
          <button
            className="min-w-[80px] p-[8px] border border-gray--200 rounded-lg"
            onClick={handleModifyCancel}
          >
            변경취소
          </button>
        )}
        <button
          className={`min-w-[80px] p-[8px] border border-gray--200 rounded-lg ${isModify && 'border-none text-white bg-blue--500'}`}
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

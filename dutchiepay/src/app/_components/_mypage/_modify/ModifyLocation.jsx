'use client';

import '@/styles/globals.css';
import '@/styles/mypage.css';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import getLocation from '@/app/_components/_user/GetLocation';
import { setUserInfoChange } from '@/redux/slice/loginSlice';

export default function ModifyLocation() {
  const location = useSelector((state) => state.login.user.location);
  const accessToken = useSelector((state) => state.login.access);
  const dispatch = useDispatch();

  const handleGetCurrentLocation = async () => {
    if (confirm('지역을 재설정 하시겠습니까?')) {
      const newLocation = await getLocation();
      if (location === newLocation) {
        alert(
          '기존과 동일한 지역에 위치하여 변경되지 않습니다.\n지역은 임의로 변경이 불가능합니다.'
        );
        return;
      }

      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/location`,
          { location: newLocation },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(setUserInfoChange({ location: newLocation }));
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <article className="mypage-profile">
      <div className="flex items-center">
        <h2 className="mypage-profile__label">지역</h2>
        <p className="mypage-profile__value">{location}</p>
      </div>
      <button
        className="mypage-profile__button"
        onClick={handleGetCurrentLocation}
      >
        재설정
      </button>
    </article>
  );
}

'use client';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import getLocation from '@/app/_util/getLocation';
import { setUserInfoChange } from '@/redux/slice/loginSlice';
import useReissueToken from '@/app/hooks/useReissueToken';

export default function ModifyLocation() {
  const location = useSelector((state) => state.login.user.location);
  const access = useSelector((state) => state.login.access);
  const dispatch = useDispatch();
  const { refreshAccessToken } = useReissueToken();
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
              Authorization: `Bearer ${access}`,
            },
          }
        );
        dispatch(setUserInfoChange({ location: newLocation }));
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await handleGetCurrentLocation();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };

  return (
    <article className="flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="w-[130px] font-semibold text-2xl">지역</h2>
        <p className="text-lg">{location}</p>
      </div>
      <button
        className="min-w-[80px] p-[8px] border border-gray--200 rounded-lg"
        onClick={handleGetCurrentLocation}
      >
        재설정
      </button>
    </article>
  );
}

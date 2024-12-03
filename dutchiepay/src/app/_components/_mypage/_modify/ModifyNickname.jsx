'use client';

import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { setUserInfoChange } from '@/redux/slice/loginSlice';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useState } from 'react';

export default function ModifyNickname({ modifyInfo, setModifyInfo }) {
  const nickname = useSelector((state) => state.login.user.nickname);
  const access = useSelector((state) => state.login.access);
  const [isModify, setIsModify] = useState(false);
  const rnickname = /^[a-zA-Z0-9가-힣]{2,8}$/;
  const { refreshAccessToken } = useReissueToken();
  const dispatch = useDispatch();

  const handleModifyCancel = () => {
    setModifyInfo((prevModifyInfo) => ({
      ...prevModifyInfo,
      nickname: nickname,
    }));
    setIsModify(false);
  };

  const handleModifyComplete = async () => {
    if (!rnickname.test(modifyInfo.nickname)) {
      alert('닉네임은 2~8자의 한글, 영문 또는 숫자로만 가능합니다.');
      return;
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/nickname`,
        { nickname: modifyInfo.nickname },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      dispatch(setUserInfoChange({ nickname: modifyInfo.nickname }));
      setIsModify(false);
    } catch (error) {
      if (error.response.data.message === '이미 사용중인 닉네임입니다.') {
        alert('이미 사용중인 닉네임입니다.');
      } else if (
        error.response.data.message === '액세스 토큰이 만료되었습니다.'
      ) {
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
        <h2 className="w-[130px] font-semibold text-2xl">닉네임</h2>
        {isModify ? (
          <input
            className="px-[8px] py-[4px] border rounded-lg outline-none"
            value={modifyInfo.nickname || ''}
            onChange={(e) =>
              setModifyInfo((prevState) => ({
                ...prevState,
                nickname: e.target.value,
              }))
            }
            placeholder="닉네임"
          />
        ) : (
          <p className="text-lg">{nickname}</p>
        )}
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
          onClick={() => {
            isModify ? handleModifyComplete() : setIsModify(!isModify);
          }}
        >
          {isModify ? '변경완료' : '변경'}
        </button>
      </div>
    </article>
  );
}

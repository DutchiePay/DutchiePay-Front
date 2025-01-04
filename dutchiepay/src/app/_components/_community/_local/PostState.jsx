import { useEffect, useState } from 'react';

import Image from 'next/image';
import axios from 'axios';
import selectArrow from '/public/image/selectArrow.svg';
import useReissueToken from '@/app/hooks/useReissueToken';
import { useSelector } from 'react-redux';

export default function PostState({
  isTrade = false,
  isMyPostWritten,
  state,
  postId,
}) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();
  const [currentState, setCurrentState] = useState('');

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  const handleSelectChange = async (e) => {
    const newValue = e.target.value;
    if (
      confirm(
        `해당 글의 상태를 변경 하시겠습니까?${newValue === '완료' || (newValue === '모집완료' ? '\n완료된 게시글은 더이상 상태를 변경할 수 없습니다.' : '')}`
      )
    ) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/community/status`,
          {
            postId: postId,
            category: isTrade ? '나눔/거래' : '마트/배달',
            status: newValue,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
        setCurrentState(newValue);
      } catch (error) {
        if (error.response?.data?.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await handleSelectChange({ target: { value: newValue } });
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다. 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
        e.target.value = currentState;
      }
    } else {
      e.target.value = currentState;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <strong>진행 상태</strong>
      {isMyPostWritten &&
      currentState !== '완료' &&
      currentState !== '모집완료' ? (
        <div className="w-[130px] relative">
          <select
            className="select-no-arrow border w-[130px] px-[12px] py-[4px] rounded-lg outline-none cursor-pointer"
            aria-label="진행상태 선택"
            value={currentState}
            onChange={handleSelectChange}
          >
            <option value={isTrade ? '대기중' : '모집중'}>
              {isTrade ? '대기중' : '모집중'}
            </option>
            {isTrade && <option value={'거래중'}>거래중</option>}
            <option value={isTrade ? '완료' : '모집완료'}>
              {isTrade ? '완료' : '모집완료'}
            </option>
          </select>
          <Image
            className="w-[12px] h-[6px] absolute top-[14px] right-[8px] pointer-events-none"
            src={selectArrow}
            alt="arrow"
            width={12}
            height={6}
            aria-hidden="true"
          />
        </div>
      ) : (
        <p>{currentState}</p>
      )}
    </div>
  );
}

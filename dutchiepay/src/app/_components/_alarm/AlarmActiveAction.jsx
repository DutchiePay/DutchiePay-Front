'use client';
import useReissueToken from '@/app/hooks/useReissueToken';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AlarmActiveAction({
  setActiveTab,
  activeTab,
  setIsDelete,
}) {
  const access = useSelector((state) => state.login.access);
  const { refreshAccessToken } = useReissueToken();

  const handleAlarmDelete = async () => {
    if (
      confirm('정말 삭제하시겠습니까?\n삭제된 게시글은 복구가 불가능합니다.')
    ) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/notice`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        alert('정상적으로 삭제되었습니다.');
        setIsDelete(true);
      } catch (error) {
        if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
          const reissueResponse = await refreshAccessToken();
          if (reissueResponse.success) {
            await handleAlarmDelete();
          } else {
            alert(
              reissueResponse.message ||
                '오류가 발생했습니다 다시 시도해주세요.'
            );
          }
        } else {
          alert('오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between text-xs p-4 w-[100%]">
        <div className="flex justify-between w-[180px] text-gray--500 ">
          <div
            onClick={() => setActiveTab('전체')}
            className={`cursor-pointer ${activeTab === '전체' ? 'text-black' : ''} hover:text-black`}
          >
            전체
          </div>

          <div className="after:content-['|']"></div>
          <div
            onClick={() => setActiveTab('chat')}
            className={`cursor-pointer ${activeTab === 'chat' ? 'text-black' : ''} hover:text-black`}
          >
            채팅
          </div>
          <div className="after:content-['|']"></div>
          <div
            onClick={() => setActiveTab('comment')}
            className={`cursor-pointer ${activeTab === 'comment' ? 'text-black' : ''} hover:text-black`}
          >
            댓글
          </div>
          <div className="after:content-['|']"></div>
          <div
            onClick={() => setActiveTab('reply')}
            className={`cursor-pointer ${activeTab === 'reply' ? 'text-black' : ''} hover:text-black`}
          >
            답글
          </div>
          <div className="after:content-['|']"></div>
          <div
            onClick={() => setActiveTab('commerce')}
            className={`cursor-pointer ${activeTab === 'commerce' ? 'text-black' : ''} hover:text-black`}
          >
            공동구매
          </div>
        </div>
        <div
          className="hover:underline hover:text-black text-gray--500 cursor-pointer"
          onClick={handleAlarmDelete}
        >
          전체삭제
        </div>
      </div>
    </>
  );
}

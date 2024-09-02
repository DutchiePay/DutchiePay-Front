'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

export default function ReprtModal() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const userId = searchParams.get('userId');
  const commentId = searchParams.get('commentId'); // 신고 종류
  const [type, setType] = useState(false);

  const closeWindow = () => {
    window.close();
  };

  useEffect(() => {
    if (postId) setType('게시글');
    else if (userId) setType('채팅');
    else if (commentId) setType('댓글');
  }, [postId, userId, commentId]);

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">{type} 신고</h1>
      <p className="text-xs text-gray--500">
        악의적인/무분별한 신고를 지속하는 사용자는 서비스 이용이 제한될 수
        있습니다.
      </p>
      <section className="mt-[40px]">
        <div className="flex gap-[24px] mb-[12px]">
          <strong>신고 대상</strong>
          <p>소풍왔니</p>
        </div>
        <hr />
        <div className="mt-[12px]">
          <strong>사유 선택</strong>
          <div className="mt-[8px] flex flex-col gap-[8px]">
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>사기 및 허위 거래</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>명의 도용</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>불법 또는 금지된 품목 거래</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>불쾌한 언행 및 부적절한 내용</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>거래 거부 및 비매너 행위</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>상품 정보 불일치</label>
            </div>
            <div className="w-full px-[8px] py-[6px] flex gap-[12px] border rounded">
              <input type="radio" />
              <label>스팸 및 광고</label>
            </div>
          </div>
          <p className="mt-[4px] text-xs text-gray--500 text-end">
            신고 접수 시 영업일 기준 1~2일 내로 처리됩니다.
          </p>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button className="text-red-500 text-sm bg-red--100 rounded px-[24px] py-[8px]">
              신고하기
            </button>
            <button
              className="text-blue--500 text-sm border border-blue--200 rounded px-[24px] py-[8px]"
              onClick={closeWindow}
            >
              취소
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

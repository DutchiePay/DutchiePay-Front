'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import clock from '/public/image/clock.svg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import useRetryFunction from '@/app/hooks/useRetryFunction';
import { useSelector } from 'react-redux';
import RemainingTime from '@/app/_components/_commerce/_productDetail/RemainingTime';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';

export default function AskModal() {
  const access = useSelector((state) => state.login.access);
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const buyId = searchParams.get('buyId');
  const [content, setContent] = useState('');
  const [isEnd, setIsEnd] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const { reissueTokenAndRetry } = useRetryFunction({
    onError: (message) => alert(message),
  });
  const [isSecret, setIsSecret] = useState(false); // 비밀글 설정 여부
  useFetchOrderProduct({ buyId, setOrderInfo: setProductInfo });
  const closeWindow = () => {
    window.close();
  };

  const handleRadio = (e) => {
    setIsSecret(e.target.value === 'secret');
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/asks`,
        { buyId: buyId, content: content, isSecret: isSecret },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      alert('문의가 성공적으로 제출되었습니다.');
      closeWindow();
    } catch (error) {
      if (error.response.data.message === '액세스 토큰이 만료되었습니다.') {
        /* 액세스 토큰이 만료된 경우 리프레시 토큰 발급 시도
        reissueTokenAndRetry(() => handleSubmit());*/
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <main className="max-w-[600px] p-[32px] overflow-x-hidden">
      <h1 className="text-3xl font-bold">문의 작성</h1>
      <p className="text-xs text-gray--500">
        문의 작성 서비스는 불편한 서비스로 인한 불만, 분쟁을 해결해드리기 위해
        운영됩니다.
        <br /> 불편한 문의 사항을 작성해주시면 빠르게 답변해드리겠습니다.
      </p>
      <section className="mt-[40px]">
        {productInfo && (
          <div className="flex gap-[12px] mb-[12px]">
            <Image
              className="rounded-lg"
              src={productInfo?.productImg}
              alt={productInfo?.productName}
              width={100}
              height={100}
            />
            <div className="flex flex-col w-[400px] gap-[4px]">
              <p className="text-xs text-gray--500">{productInfo?.storeName}</p>
              <strong className="title--multi-line">
                {productInfo?.productName}
              </strong>
              <div className="flex gap-[4px] text-sm text-blue--700 font-semibold">
                <Image src={clock} alt="남은 시간" width={16} height={16} />
                <RemainingTime
                  endTime={productInfo?.expireDate}
                  isEnd={isEnd}
                  setIsEnd={setIsEnd}
                />
              </div>
            </div>
          </div>
        )}

        <hr />
        <div className="mt-[12px]">
          <p className="text-blue--500 font-semibold">문의 내용</p>
          <textarea
            className="w-full h-[300px] mt-[8px] border border-blue--500 rounded p-[12px] resize-none product-ask-textarea outline-none"
            placeholder="문의 사항을 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center gap-[8px]">
            <p className="mr-[8px] text-blue--500 font-semibold">공개 설정</p>
            <input
              type="radio"
              value="all"
              checked={isSecret === false}
              onChange={handleRadio}
            />
            <label className="text-sm text-gray--500 mr-[8px]">전체 공개</label>
            <input
              type="radio"
              value="secret"
              checked={isSecret === true}
              onChange={handleRadio}
            />
            <label className="text-sm text-gray--500">비공개</label>
          </div>
          <div className="flex justify-center gap-[24px] mt-[24px]">
            <button
              className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]"
              onClick={handleSubmit}
            >
              문의하기
            </button>
            <button
              className="text-blue--500 text-sm border border-blue--500 rounded-lg px-[24px] py-[8px]"
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

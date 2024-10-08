'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import Image from 'next/image';
import clock from '../../../../public/image/clock.svg';
import product from '../../../../public/image/product1.jpg';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AskModal() {
  const searchParams = useSearchParams();
  const orderNum = searchParams.get('orderNum');
  const [isAfterOrder, setIsAfterOrder] = useState(false); // 주문 후 문의 여부
  const [isSecret, setIsSecret] = useState(false); // 비밀글 설정 여부

  const closeWindow = () => {
    window.close();
  };

  const handleRadio = (e) => {
    setIsSecret(e.target.value === 'secret');
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
        <div className="flex gap-[12px] mb-[12px]">
          <Image
            className="rounded-lg"
            src={product}
            alt="애슐리 볶음밥"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-[400px] gap-[4px]">
            <p className="text-xs text-gray--500">(주)이랜드팜앤푸드(서울)</p>
            <strong className="title--multi-line">
              애슐리 볶음밥 10인분 혼합 구성
              10종(통새우+갈릭스테이크+버터와규+깍두기베이컨+케이준+랍스터+해물+묵은지삼겹+잡채+스크램블게살)아침
              대용 직장인 도시락
            </strong>
            <div className="flex gap-[4px] text-sm text-blue--700 font-semibold">
              <Image src={clock} alt="남은 시간" width={16} height={16} />
              12일 08시간 36분 남음
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-[12px]">
          <p className="text-blue--500 font-semibold">문의 내용</p>
          <textarea
            className="w-full h-[300px] mt-[8px] border border-blue--500 rounded p-[12px] resize-none product-ask-textarea outline-none"
            placeholder="문의 사항을 작성해주세요."
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
            <button className="text-white text-sm bg-blue--500 rounded-lg px-[24px] py-[8px]">
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

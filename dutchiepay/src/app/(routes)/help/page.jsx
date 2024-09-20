'use client';

import Image from 'next/image';
import more from '../../../../public/image/more.svg';
import { useState } from 'react';

export default function Help() {
  const [openIndexes, setOpenIndexes] = useState(Array(10).fill(false)); // 토글 상태

  const handleToggle = (index) => {
    setOpenIndexes((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const faqs = [
    {
      id: 1,
      question: '[공동구매] 공동구매 진행 절차는 어떻게 되나요?',
      answer:
        "공동구매에 참여하려면 먼저 회원가입 후 원하는 상품 페이지에서 '결제하기' 버튼을 클릭하시면 됩니다. 결제를 완료하면 공동구매에 참여되며, 마감 기간 이내에 최소 충족 인원을 달성한 경우 공동구매가 성공하여 순차적으로 배송이 진행됩니다.",
    },
    {
      id: 2,
      question: '[공동구매] 공동구매 취소는 가능한가요?',
      answer:
        '공동구매는 마감 전까지 결제 취소가 가능합니다. 확정 후에는 주문 취소가 불가하니 신중한 구매 부탁드립니다.',
    },
    {
      id: 3,
      question:
        '[공동구매] 공동구매한 상품을 교환/환불할 수 있는 방법이 있나요?',
      answer:
        '공동구매 특성상 구매자의 변심을 이유로 교환/환불을 하실 수 없습니다. 만약, 구매하신 상품에 문제가 있을 경우, 배송완료를 기준으로 7일 이내에 교환/환불 요청해 주시면 됩니다.',
    },
    {
      id: 4,
      question: '[공동구매] 결제는 어떤 방법으로 할 수 있나요?',
      answer:
        '신용카드, 무통장입금, 카카오페이를 지원합니다. 결제 시 원하는 방법을 선택해 주시면 됩니다.',
    },
    {
      id: 5,
      question: '[공동구매] 공동구매가 실패한 경우 어떻게 되나요?',
      answer:
        '최소 인원이 충족되지 못한 경우 공동구매가 실패합니다. 공동구매 실패 시에 결제하신 금액은 자동으로 환불됩니다. 신용카드는 승인 취소, 무통장입금은 환불 계좌로 입금됩니다.',
    },
    {
      id: 6,
      question: '[나눔/거래] 나눔/거래 사기를 당했어요!',
      answer:
        '사기 거래가 적발될 경우, 해당 회원의 자격이 즉시 정지됩니다. 더불어, 해당 거래에 대해 법적 조치가 취해질 수 있습니다. 이는 공정한 거래 환경을 유지하고, 다른 회원들을 보호하기 위한 조치입니다.',
    },
  ];

  return (
    <section className="min-h-[690px] w-[1020px]">
      <div className="flex items-baseline gap-[8px] mt-[40px] mb-[16px]">
        <h1 className="text-3xl font-bold">고객센터</h1>
        <small className="text-sm text-gray--500">자주 물어보시는 질문</small>
      </div>
      <hr />
      <section className="w-[810px] mx-auto my-[60px]">
        {faqs.map((faq, index) => (
          <article key={faq.id}>
            <header
              className="flex justify-between items-center px-[24px] py-[12px] border cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div className="flex gap-[24px] items-center">
                <p className="text-blue--500 font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <button
                  className="font-bold"
                  aria-expanded={openIndexes[index]}
                >
                  {faq.question}
                </button>
              </div>
              <Image
                className={`w-[17px] h-[8px] transition-transform duration-200 ${
                  openIndexes[index] ? 'rotate-180' : ''
                }`}
                src={more}
                alt="더보기"
                width={17}
                height={8}
              />
            </header>
            {openIndexes[index] && (
              <div className="bg-gray--100 border">
                <p className="text-sm p-[40px]">{faq.answer}</p>
              </div>
            )}
          </article>
        ))}
      </section>
    </section>
  );
}

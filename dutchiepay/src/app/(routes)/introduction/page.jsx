/*
  https://help.pxplus.io/group_kor 추후 참고할 예정
*/
export default function Introduction() {
  return (
    <section className="mt-[40px] min-h-[750px] w-[1020px]">
      <h1 className="text-blue--500 text-3xl font-bold">더취페이 이용가이드</h1>
      <p className="text-sm text-gray--500">
        더취페이가 처음이라면? 더취페이의 모든 것을 알려드릴게요!
      </p>
      <hr className="mt-[12px]" />
      <article className="mt-[32px]">
        <h2 className="text-blue--500 text-2xl font-bold">더취페이는?</h2>
        <p>
          더취페이는 자취생의, 자취생에 의한, 자취생을 위한 공동구매 및 커뮤니티
          서비스입니다!
          <br />
          혼자서는 불가능하고 난감했던 모든 것들을 더취페이에서 다양한
          자취생들과 함께 해결할 수 있습니다.
          <br />
        </p>
        <h2 className="mt-[32px] text-blue--500 text-2xl font-bold">
          어떤 서비스를 제공하나요?
        </h2>
        <p>
          더취페이의 공동구매를 통해 자취꿀템을 저렴한 가격으로 구매하실 수
          있습니다.
          <br />
          최소 판매 수량만 달성한다면 자취생들에게 꼭 필요한 자취꿀템들을
          저렴하게 구매할 수 있습니다.
          <br />
          <br />
          지역 게시판을 통해 우리 지역 자취생들과 마트/배달을 함께 할 수도,
          자취템을 중고거래 할 수도 있습니다. <br />
          커뮤니티를 통해서 나만의 자취 꿀팁을 공유하고 다양한 자취생들과
          자유롭게 소통할 수 있습니다.
        </p>
        <h2 className="mt-[32px] text-blue--500 text-2xl font-bold">
          이런 분들에게 강력 추천해요!
        </h2>
        <p>
          자취생들의 대표 고민 중 하나인 냉장고 음식 처리 문제를 더취페이에선
          손쉽게 해결할 수 있습니다! <br />
          마트에서 저렴하게 할인해 사고싶지만, 나에겐 너무 많을 때! 함께 구매할
          우리 지역 자취생을 찾아보세요! <br />
          <br />
          자취생이라면 필수인 &apos;배달음식&apos;! 1인분만 먹고 싶지만,
          배달음식은 2~3인분을 기준으로 해 부담스러우시다면? <br />
          더취페이에서 같이 배달 시킬 우리 지역 자취생을 손쉽게 찾을 수
          있습니다.
        </p>
      </article>
      <hr className="mt-[32px]" />
      <section>
        <h2 className="text-blue--500 text-2xl font-bold">
          공동구매 설명 가이드
        </h2>
      </section>
      <section>
        <h2 className="text-blue--500 text-2xl font-bold">
          마트/배달 설명 가이드
        </h2>
      </section>
      <section>
        <h2 className="text-blue--500 text-2xl font-bold">
          나눔/거래 설명 가이드
        </h2>
      </section>
      <section>
        <h2 className="text-blue--500 text-2xl font-bold">기타 설명 가이드</h2>
      </section>
    </section>
  );
}

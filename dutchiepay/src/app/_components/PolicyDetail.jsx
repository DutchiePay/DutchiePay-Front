export default function PolicyDetail() {
  return (
    <div className="policy-details bg-gray-100 p-4 rounded-lg text-left mb-[16px]">
      <h3 className="font-bold mb-[8px]">1. 개인정보 수집 및 이용 안내</h3>
      <p>
        <strong>1.1. 수집 목적</strong>
      </p>
      <p>당사는 회원님의 개인정보를 아래와 같은 목적으로 수집 및 이용합니다:</p>
      <ul className="list-disc ml-5">
        <li>서비스 제공을 위한 회원 가입 및 관리</li>
        <li>거래 및 결제 이력 관리</li>
        <li>고객 문의 응대 및 불만 처리</li>
        <li>사기 예방 및 사용자 보호를 위한 회원 관리</li>
        <li>서비스 향상을 위한 통계 분석 및 리서치</li>
      </ul>
      <p>
        <strong>1.2. 수집 항목</strong>
      </p>
      <p>당사는 아래와 같은 개인정보를 수집합니다:</p>
      <ul className="list-disc ml-5">
        <li>필수 정보: 이메일, 전화번호, 주소, 생년월일, 결제 정보</li>
        <li>선택 정보: 이름</li>
      </ul>
      <p>
        <strong>1.3. 보유 및 이용 기간</strong>
      </p>
      <p>회원님의 개인정보는 아래와 같은 기간 동안 보유 및 이용됩니다:</p>
      <ul className="list-disc ml-5">
        <li>회원 탈퇴 시까지</li>
        <li>관련 법령에 따라 거래 및 결제 이력 등 특정 정보는 5년간 보관</li>
      </ul>

      <h3 className="font-bold mb-[8px]">
        2. 개인정보 제3자 제공 및 처리 위탁 안내
      </h3>
      <p>
        <strong>2.1. 개인정보 제3자 제공</strong>
      </p>
      <p>
        당사는 회원님의 개인정보를 제3자에게 제공할 수 있으며, 제공 시 아래의
        사항을 명확히 안내드립니다:
      </p>
      <ul className="list-disc ml-5">
        <li>제공받는 자: 결제 대행사, 배송업체 등</li>
        <li>제공 목적: 결제 처리, 물품 배송</li>
        <li>제공 항목: 이름, 주소, 전화번호, 결제 정보</li>
        <li>보유 및 이용 기간: 제공 목적 달성 시까지</li>
      </ul>
      <p>
        <strong>2.2. 개인정보 처리 위탁</strong>
      </p>
      <p>당사는 아래와 같은 업무를 외부 업체에 위탁하여 처리하고 있습니다:</p>
      <ul className="list-disc ml-5">
        <li>위탁 업무 내용: 상품 배송, 결제 처리</li>
      </ul>
      <h3 className="font-bold mb-[8px]">3. 동의 방법</h3>
      <ul className="list-disc ml-5">
        <li>
          회원님께서는 개인정보 제공 및 이용에 대해 각 항목별로 동의 여부를
          필수로 선택해야합니다.
          <br /> 항목에 동의하지 않으면 서비스 이용이 불가능합니다.
        </li>
      </ul>

      <h3 className="font-bold mb-[8px]">4. 부정 거래 및 사기 예방 안내</h3>
      <ul className="list-disc ml-5">
        <li>
          사기 거래 적발 시 즉시 회원 자격이 정지되며, 해당 거래에 대한 법적
          조치가 취해질 수 있습니다.
        </li>
        <li>사기 신고가 3회 누적될 경우, 해당 계정은 일시적으로 정지됩니다.</li>
      </ul>
      <h3 className="font-bold mb-[8px]">5. 환불 정책</h3>
      <ul className="list-disc ml-5">
        <li>단순 변심에 의한 환불은 불가능합니다.</li>
        <li>
          상품의 하자 또는 잘못된 배송에 따른 환불은 가능합니다. 환불 요청은
          구매내역에서 접수해주시기 바랍니다.
        </li>
      </ul>
    </div>
  );
}

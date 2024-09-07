import '@/styles/globals.css';

export default function AvailableCoupons() {
  return (
    <div className="w-[260px] h-[170px] border flex flex-col gap-[4px] rounded-xl shadow-md px-[16px] justify-center">
      <div className="flex justify-between items-center">
        <p className="title--single-line max-w-[180px] text-[20px] font-bold">
          신규 가입 감사 쿠폰
        </p>
        <button className="w-[40px] h-[40px] flex justify-center items-center rounded-full border border-blue--500 text-blue--500 hover:bg-blue--500 hover:text-white ">
          <svg
            width="25"
            height="20"
            viewBox="0 0 25 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-4"
          >
            <path d="M23.5852 11.1717C24.2359 10.521 24.2359 9.46407 23.5852 8.81329L15.2551 0.483208C14.6043 -0.16758 13.5474 -0.16758 12.8966 0.483208C12.2458 1.134 12.2458 2.19087 12.8966 2.84166L18.3893 8.3291L2.41634 8.3291C1.49482 8.3291 0.750324 9.0736 0.750324 9.99512C0.750324 10.9166 1.49482 11.6611 2.41634 11.6611L18.3841 11.6611L12.9018 17.1486C12.251 17.7994 12.251 18.8562 12.9018 19.507C13.5526 20.1578 14.6095 20.1578 15.2603 19.507L23.5904 11.1769L23.5852 11.1717Z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-end items-baseline mt-[4px]">
        <p className="text-sm text-blue--500">
          총 금액에서 <strong className="text-3xl text-blue--500">15%</strong>
        </p>
      </div>
      <p className="mt-[12px] text-xs text-gray--500">
        주문 금액 <strong>15,000원</strong> 이상 시 사용 가능
      </p>
      <p className="text-xs text-gray--500">2024-09-11 까지 사용 가능</p>
    </div>
  );
}

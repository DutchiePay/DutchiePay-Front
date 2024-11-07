import '@/styles/globals.css';
import '@/styles/mypage.css';

export default function OrderDetail({ product, isMore }) {
  return (
    <>
      {isMore && (
        <div>
          <table className="mx-auto my-[16px] border border-collapse">
            <tr className="border-b">
              <th className="mypage-order-details__table-header">배송지</th>
              <td className="flex flex-col mypage-order-details__table-data">
                <p className="font-bold">박용호</p>
                <p className="text-sm">{product.phone}</p>
                <div className="flex gap-[8px]">
                  <p className="text-sm">{product.address}</p>
                  <p className="text-sm">{product.detail}</p>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <th className="mypage-order-details__table-header">배송메시지</th>
              <td className="mypage-order-details__table-data">
                {product.message
                  ? product.message
                  : '설정하신 배송메시지가 없습니다.'}
              </td>
            </tr>
            <tr className="border-b">
              <th className="mypage-order-details__table-header">송장번호</th>
              <td className="mypage-order-details__table-data flex justify-between">
                <span className="tracking-number">1234567890</span>
                <button className="bg-blue--500 text-white text-xs px-[8px] py-[4px] rounded-md">
                  배송조회
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <th className="mypage-order-details__table-header">결제정보</th>
              <td className="mypage-order-details__table-data flex flex-col gap-[16px]">
                <div>
                  <div className="flex justify-between">
                    <strong>주문 금액</strong>
                    <p className="text-blue--500 text-lg font-semibold">
                      {product.totalPrice.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                  <div className="ml-[28px]">
                    <div className="flex justify-between">
                      <p className="text-sm">판매가격</p>
                      <p className="text-sm">
                        {product.productPrice.toLocaleString('ko-KR')}원
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">할인가격</p>
                      <p className="text-sm">17,250원</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <strong>카드 결제</strong>
                    <p className="text-blue--500 text-lg font-semibold">
                      {product.totalPrice.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                  <p className="ml-[28px] text-gray--500 text-sm">
                    신한 1111 **** **** 일시불
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

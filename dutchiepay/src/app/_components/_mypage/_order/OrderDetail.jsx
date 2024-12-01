export default function OrderDetail({ product, isMore }) {
  return (
    <>
      {isMore && (
        <div>
          <table className="mx-auto my-[16px] border border-collapse">
            <tr className="border-b">
              <th className="w-[140px] bg-blue--100 font-semibold p-[16px]">
                배송지
              </th>
              <td className="flex flex-col w-[360px] p-[16px]">
                <p className="font-bold">{product.receiver}</p>
                <p className="text-sm">{product.phone}</p>
                <div className="flex gap-[8px]">
                  <div className="flex gap-[8px]">
                    <p className="text-sm">({product.zipCode})</p>
                    <p className="text-sm">{product.address}</p>
                  </div>
                  <p className="text-sm">{product.detail}</p>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <th className="w-[140px] bg-blue--100 font-semibold p-[16px]">
                배송메시지
              </th>
              <td className="w-[360px] p-[16px]">
                {product.message
                  ? product.message
                  : '설정하신 배송메시지가 없습니다.'}
              </td>
            </tr>
            {product.deliveryState !== '공구진행중' &&
              product.deliveryState !== '배송준비중' &&
              product.deliveryState !== '취소완료' &&
              product.deliveryState !== '공구실패' && (
                <tr className="border-b">
                  <th className="w-[140px] bg-blue--100 font-semibold p-[16px]">
                    송장번호
                  </th>
                  <td className="w-[360px] p-[16px] flex justify-between">
                    <span>1234567890</span>
                    <button
                      className="bg-blue--500 text-white text-xs px-[8px] py-[4px] rounded-md"
                      onClick={() => alert('배송조회 클릭됨')}
                    >
                      배송조회
                    </button>
                  </td>
                </tr>
              )}
            <tr className="border-b">
              <th className="w-[140px] bg-blue--100 font-semibold p-[16px]">
                결제정보
              </th>
              <td className="w-[360px] p-[16px] flex flex-col gap-[16px]">
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
                        {(
                          product.productPrice * product.quantity
                        ).toLocaleString('ko-KR')}
                        원
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">할인가격</p>
                      <p className="text-sm">
                        {(
                          product.discountPrice * product.quantity
                        ).toLocaleString('ko-KR')}
                        원
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <strong>
                      {product.payment === 'kakao'
                        ? '카카오페이'
                        : product.payment === 'toss'
                          ? '토스페이'
                          : '카드'}{' '}
                      결제
                    </strong>
                    <p className="text-blue--500 text-lg font-semibold">
                      {product.totalPrice.toLocaleString('ko-KR')}원
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

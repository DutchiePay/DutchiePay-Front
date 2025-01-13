'use client';

export default function PaymentChoice({ setValue, watch }) {
  const paymentMethod = watch('paymentMethod');
  const handlePaymentChange = (method) => {
    setValue('paymentMethod', method);
  };

  return (
    <article className="mt-[8px] flex flex-col gap-[8px]">
      <h3 className="text-lg font-bold">결제 수단 선택</h3>
      <div className="flex justify-between">
        <label
          className={`w-[180px] border rounded-lg p-[12px] text-sm text-center hover:bg-blue--200 hover:border-blue--200 ${paymentMethod === '신용카드' ? 'w-[180px] border rounded-lg p-[12px] text-sm text-center bg-blue--200 border-blue--200' : ''}`}
          onClick={() => handlePaymentChange('신용카드')}
        >
          <input
            className="hidden text-center"
            type="radio"
            value="신용카드"
            checked={paymentMethod === '신용카드'}
            onChange={() => handlePaymentChange('신용카드')}
          />
          신용카드
        </label>
        <label
          className={`w-[180px] border rounded-lg p-[12px] text-sm text-center hover:bg-blue--200 hover:border-blue--200 ${paymentMethod === '카카오페이' ? 'w-[180px] border rounded-lg p-[12px] text-sm text-center bg-blue--200 border-blue--200' : ''}`}
          onClick={() => handlePaymentChange('카카오페이')}
        >
          <input
            className="hidden text-center"
            type="radio"
            value="카카오페이"
            checked={paymentMethod === '카카오페이'}
            onChange={() => handlePaymentChange('카카오페이')}
          />
          카카오페이
        </label>
      </div>
    </article>
  );
}

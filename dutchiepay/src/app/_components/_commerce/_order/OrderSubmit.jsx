'use client';

import '@/styles/commerce.css';
import '@/styles/globals.css';

import Orderer from '@/app/_components/_commerce/_order/Orderer';
import Payment from '@/app/_components/_commerce/_order/Payment';
import { useForm } from 'react-hook-form';
import usePayment from '@/app/hooks/usePayment';

export default function OrderSubmit({ quantity, orderInfo, buyId }) {
  const { handlePayment } = usePayment(quantity, orderInfo, buyId);
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = (formData) => {
    if (!formData.paymentMethod) {
      alert('결제 수단을 선택해주세요.');
      return;
    }
    handlePayment(formData);
  };

  return (
    <form
      className="mt-[40px] flex justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[600px] flex flex-col gap-[12px]">
        <Orderer register={register} setValue={setValue} />
      </div>
      <Payment
        setValue={setValue}
        orderInfo={orderInfo}
        quantity={Number(quantity)}
      />
    </form>
  );
}

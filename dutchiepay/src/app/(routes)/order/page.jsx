'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import * as PortOne from '@portone/browser-sdk/v2';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DELIVERY_MESSAGE } from '@/app/_util/constants';
import OrderInfo from '@/app/_components/_commerce/_order/OrderInfo';
import Orderer from '@/app/_components/_commerce/_order/Orderer';
import Payment from '@/app/_components/_commerce/_order/Payment';
import axios from 'axios';
import getRemainingTime from '@/app/_util/getRemainingTime';
import useFetchOrderProduct from '@/app/hooks/useFetchOrderProduct';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

export default function Order() {
  const access = useSelector((state) => state.login.access);
  const searchParams = useSearchParams();
  const buyId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');
  const [orderInfo, setOrderInfo] = useState(null);
  const { handleSubmit, register, setValue } = useForm();
  const router = useRouter();

  useFetchOrderProduct({ buyId, setOrderInfo });

  const openPopup = (redirectUrl) => {
    window.open(redirectUrl, `더취페이 결제`, 'width=600,height=400');
  };

  const onSubmit = async (formData) => {
    if (getRemainingTime(orderInfo.expireDate) === '마감된 공구 입니다.') {
      if (
        confirm(
          '공동구매가 마감되어 주문하실 수 없습니다.\n확인을 누르실 경우, 메인으로 이동합니다.'
        )
      ) {
        router.push('/');
      }
      return;
    }

    if (DELIVERY_MESSAGE[formData.deliveryMessage]) {
      formData.deliveryMessage = DELIVERY_MESSAGE[formData.deliveryMessage];
    } else if (formData.deliveryMessage === 'option5') {
      formData.deliveryMessage = formData.customMessage;
    }

    if (formData.paymentMethod === '카카오페이') {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/pay/ready?type=kakao`,
          {
            buyId: Number(buyId),
            productName: orderInfo.productName,
            quantity: Number(quantity),
            totalAmount: orderInfo.salePrice * quantity,
            taxFreeAmount: 0,
            receiver: formData.recipient,
            phone: formData.phone,
            zipCode: formData.zipCode,
            address: formData.address,
            detail: formData.detail,
            message: formData.deliveryMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        openPopup(response.data.redirectUrl);
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else if (formData.paymentMethod === '신용카드') {
      const paymentId = `payment-${uuidv4()}`;
      try {
        const response = await PortOne.requestPayment({
          storeId: process.env.NEXT_PUBLIC_STORE_ID,
          channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
          paymentId: paymentId,
          orderName: orderInfo.productName,
          totalAmount: orderInfo.salePrice * quantity,
          currency: 'CURRENCY_KRW',
          payMethod: 'CARD',
        });

        if (response.code != null) {
          return alert(response.message);
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/pay?type=card`,
            {
              buyId: Number(buyId),
              paymentId: paymentId,
              productName: orderInfo.productName,
              quantity: Number(quantity),
              totalAmount: orderInfo.salePrice * quantity,
              receiver: formData.recipient,
              phone: formData.phone,
              zipCode: formData.zipCode,
              address: formData.address,
              detail: formData.detail,
              message: formData.deliveryMessage,
            },
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          );

          router.push(`/order/success?orderid=${response.data.orderNum}`);
        } catch (error) {
          alert('결제 실패');
        }
      } catch (error) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else if (formData.paymentMethod === '토스페이') {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/pay?type=card`,
          {
            buyId: Number(buyId),
            productName: orderInfo.productName,
            quantity: Number(quantity),
            amount: orderInfo.salePrice * quantity,
            amountTaxFree: 0,
            receiver: formData.recipient,
            phone: formData.phone,
            zipCode: formData.zipCode,
            address: formData.address,
            detail: formData.detail,
            message: formData.deliveryMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );

        openPopup(response.data.checkoutPage);

        // 결제 성공 실패에 따른 처리 구현 필요
      } catch (error) {
        alert('결제 실패');
      }
    }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const allowedOrigins = [process.env.NEXT_PUBLIC_BASE_URL];

      if (allowedOrigins.includes(event.origin)) {
        if (event.data.type === 'PAYMENT_APPROVED') {
          router.push(`/order/success?orderid=${event.data.orderNum}`);
        } else if (
          event.data.type === 'PAYMENT_CANCEL' ||
          event.data.type === 'PAYMENT_FAIL'
        ) {
          alert('결제가 실패 또는 취소되었습니다. 다시 결제해주세요.');
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [router]);

  return (
    <section className="min-h-[750px] w-[1020px] mt-[40px] mb-[100px]">
      <h1 className="text-3xl font-bold">주문/결제</h1>
      <p className="text-xs text-gray--500">
        ※ 공동구매 마감 시간 이전까지 결제가 완료 되어야 성공적으로 구매가
        가능합니다.
      </p>
      <OrderInfo orderInfo={orderInfo} quantity={Number(quantity)} />
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
    </section>
  );
}

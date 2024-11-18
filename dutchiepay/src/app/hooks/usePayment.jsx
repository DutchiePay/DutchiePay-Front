import * as PortOne from '@portone/browser-sdk/v2';

import { DELIVERY_MESSAGE } from '@/app/_util/constants';
import axios from 'axios';
import { getRemainingTime } from '@/app/_util/getFormatDate';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const usePayment = (quantity, orderInfo, buyId) => {
  const access = useSelector((state) => state.login.access);
  const router = useRouter();

  const handlePayment = async (formData) => {
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
        window.open(
          response.data.redirectUrl,
          `더취페이 카카오페이 결제`,
          'width=600,height=400'
        );
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
          const res = await axios.post(
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

          router.push(`/order/success?orderid=${res.data.orderNum}`);
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

        window.open(
          response.data.checkoutPage,
          `더취페이 토스페이 결제`,
          'width=600,height=400'
        );
      } catch (error) {
        alert('결제 실패');
      }
    }
  };

  return { handlePayment };
};

export default usePayment;

'use client';

import ContentLoader from 'react-content-loader';
import Image from 'next/image';
import delivery from '/public/image/delivery.svg';
import dynamic from 'next/dynamic';
import useFetchDelivery from '@/app/hooks/useFetchDelivery';

const DeliveryAddressItem = dynamic(
  () => import('@/app/_components/_mypage/_delivery/DeliveryAddressItem'),
  {
    loading: () => (
      <ContentLoader
        speed={2}
        width={690}
        height={118}
        viewBox="0 0 690 118"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="4" ry="4" width="50" height="28" />
        <rect x="0" y="30" rx="4" ry="4" width="50" height="24" />
        <rect x="0" y="30" rx="4" ry="4" width="100" height="24" />
        <rect x="0" y="56" rx="4" ry="4" width="200" height="24" />
        <rect x="0" y="82" rx="4" ry="4" width="200" height="24" />
      </ContentLoader>
    ),
  }
);
const AddressAddition = dynamic(
  () => import('@/app/_components/_mypage/_delivery/AddressAddition')
);

export default function DeliveryAddress() {
  const { deliveryAddress, setIsChanged } = useFetchDelivery();

  return (
    <article>
      <h2 className="font-semibold text-2xl">배송지 관리</h2>
      {!deliveryAddress || deliveryAddress.length === 0 ? (
        <div className="mt-[40px] flex flex-col justify-center items-center">
          <Image
            className="opacity-50"
            src={delivery}
            alt="delivery-icon"
            width={100}
            height={100}
          />
          <strong className="mt-[8px] text-xl">
            설정한 배송지가 없습니다.
          </strong>
          <p className="text-sm text-gray--500">
            자주 사용하는 배송지를 추가해 편리하게 공동구매를 이용하실 수
            있습니다.
          </p>
        </div>
      ) : (
        <div className="mt-[32px]">
          {deliveryAddress.map((item, index) => (
            <DeliveryAddressItem
              key={index}
              deliveryAddress={item}
              setIsChanged={setIsChanged}
              isFirst={index === 0}
            />
          ))}
        </div>
      )}
      <AddressAddition
        deliveryAddress={deliveryAddress}
        setIsChanged={setIsChanged}
      />
    </article>
  );
}

import '@/styles/mypage.css';
import '@/styles/globals.css';

import DeliveryAddressItem from './DeliveryAddressItem';
import Image from 'next/image';
import delivery from '../../../../public/image/delivery.svg';

export default function DeliveryAddress() {
  const deliveryAddress = [
    {
      addressId: 1,
      addressName: '자취방',
      name: '박용호',
      phone: '01012341234',
      address: '강원 속초시 중앙로129번길 21',
      detail: '1층',
      zipcode: '12345',
      isDefault: true,
    },
    {
      addressId: 2,
      addressName: '자취방',
      name: '박용호',
      phone: '01012341234',
      address: '강원 속초시 중앙로129번길 21',
      detail: '1층',
      zipcode: '12345',
      isDefault: false,
    },
    {
      addressId: 3,
      addressName: '자취방',
      name: '박용호',
      phone: '01012341234',
      address: '강원 속초시 중앙로129번길 21',
      detail: '1층',
      zipcode: '12345',
      isDefault: false,
    },
  ];

  return (
    <article>
      <h2 className="font-semibold text-2xl">배송지 관리</h2>
      {deliveryAddress.length === 0 ? (
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
              isFirst={index === 0}
            />
          ))}
        </div>
      )}
      <button
        className="w-[150px] mt-[24px] px-[24px] py-[8px] bg-blue--500 text-white text-sm flex justify-between rounded block mx-auto"
        onClick={() => {
          window.open(
            '/delivery-address',
            '주소지 추가',
            'width=620, height=670, location=1'
          );
        }}
      >
        주소지 추가<p>+</p>
      </button>
    </article>
  );
}

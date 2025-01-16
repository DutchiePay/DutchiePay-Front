'use client';

import useGetPostCode from '@/app/hooks/useGetPostCode';

export default function DeliveryAddressInput({ setValue, register }) {
  const rPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const getPostCode = useGetPostCode(setValue);

  const handlePostCode = async () => {
    try {
      await getPostCode();
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <input
        className="w-full border p-[12px] rounded outline-none"
        type="text"
        placeholder="배송지 이름"
        {...register('addressName', {
          required: '배송지 이름을 작성해주세요.',
        })}
      />
      <input
        className="w-full border p-[12px] rounded outline-none"
        type="text"
        placeholder="받는 사람"
        {...register('name', {
          required: '받는 사람의 이름을 입력해주세요.',
        })}
      />
      <input
        className="w-full border p-[12px] rounded outline-none"
        type="text"
        placeholder="전화번호"
        {...register('phone', {
          required: '전화번호를 입력해주세요,',
          pattern: {
            value: rPhone,
            message: '올바른 휴대폰 번호 형식을 입력해주세요',
          },
          onChange: (e) => {
            const newValue = e.target.value.replace(/[^0-9]/g, '');
            setValue('phone', newValue);
          },
        })}
      />
      <div className="flex gap-[12px]">
        <input
          className="w-full border p-[12px] rounded outline-none"
          type="number"
          placeholder="우편번호"
          disabled
          {...register('zipCode', {
            required: '우편번호 찾기를 통해 주소를 입력해주세요.',
          })}
        />
        <button
          className="w-[200px] bg-blue--500 text-white rounded"
          onClick={handlePostCode}
          type="button"
        >
          우편번호 찾기
        </button>
      </div>
      <input
        className="w-full border p-[12px] rounded outline-none"
        type="text"
        placeholder="주소"
        disabled
        {...register('address', {
          required: '우편번호 찾기를 통해 주소를 입력해주세요.',
        })}
      />
      <input
        className="w-full border p-[12px] rounded outline-none"
        type="text"
        placeholder="상세주소"
        {...register('detail')}
      />
      <div className="flex items-center gap-[8px]">
        <input id="default" type="checkbox" {...register('isDefault')} />
        <label htmlFor="default" className="text-sm">
          기본배송지로 설정
        </label>
      </div>
    </>
  );
}

'use client';

import useGetPostCode from '@/app/hooks/useGetPostCode';

export default function AddressInput({ register, setValue }) {
  const getPostCode = useGetPostCode(setValue);

  const handlePostCode = async () => {
    try {
      await getPostCode();
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <tr className="border h-[140px]">
      <th className="w-[120px] bg-gray--100">주소</th>
      <td className="px-[16px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <input
              {...register('zipCode', {
                require: '우편번호 찾기를 통해 우편번호를 입력해주세요.',
              })}
              className="w-[70px] border rounded-lg px-[8px] py-[6px] text-sm outline-none"
              placeholder="우편번호"
            />
            <button
              className="h-[28px] px-[8px] text-white text-sm bg-blue--500 rounded-lg"
              onClick={handlePostCode}
              type="button"
            >
              주소 검색
            </button>
          </div>
          <input
            {...register('address', {
              require: '우편번호 찾기를 통해 주소를 입력해주세요.',
            })}
            className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
            placeholder="주소"
          />
          <input
            {...register('detail')}
            className="w-[300px] border rounded-lg px-[8px] py-[6px] text-sm outline-none"
            placeholder="상세 주소"
          />
        </div>
      </td>
    </tr>
  );
}

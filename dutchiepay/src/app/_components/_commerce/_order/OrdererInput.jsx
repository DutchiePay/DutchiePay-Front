'use client';

export default function OrdererInput({ register }) {
  return (
    <>
      <tr className="border h-[60px]">
        <th className="w-[120px] bg-gray--100">받는 분</th>
        <td className="px-[16px]">
          <input
            {...register('recipient', {
              require: '받는 분의 이름을 입력해주세요.',
            })}
            className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
            placeholder="받는 분"
          />
        </td>
      </tr>
      <tr className="border h-[60px]">
        <th className="w-[120px] bg-gray--100">연락처</th>
        <td className="px-[16px]">
          <input
            {...register('phone', {
              required: '전화번호를 입력해주세요.',
            })}
            className="border rounded-lg px-[8px] py-[6px] text-sm outline-none"
            placeholder="전화번호(ex) 01012345678)"
          />
        </td>
      </tr>
    </>
  );
}

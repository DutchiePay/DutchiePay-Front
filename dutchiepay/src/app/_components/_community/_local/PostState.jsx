import Image from 'next/image';
import selectArrow from '/public/image/selectArrow.svg';

export default function PostState({ isMyPostWritten, state }) {
  return (
    <div className="flex justify-between items-center">
      <strong>진행 상태</strong>
      {isMyPostWritten ? (
        <div className="w-[130px] relative">
          <select
            className="select-no-arrow border w-[130px] px-[12px] py-[4px] rounded-lg outline-none cursor-pointer"
            aria-label="진행상상태 선택"
          >
            <option>모집중</option>
            <option>모집완료</option>
          </select>
          <Image
            className="w-[12px] h-[6px] absolute top-[14px] right-[8px] pointer-events-none"
            src={selectArrow}
            alt="arrow"
            width={12}
            height={6}
            aria-hidden="true"
          />
        </div>
      ) : (
        <p>{state}</p>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import close from '/public/image/alarm/close.svg';

export default function AlarmHeader({ handlePopup }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-t-lg w-full h-[70px]">
      <div className="font-bold text-xl">알림</div>
      <div className="flex w-[120px] justify-between">
        <button
          onClick={() => {
            window.open(
              '/chatlist',
              '채팅 리스트',
              'width=480,height=750,toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=no'
            );
          }}
          className="flex text-center w-full text-sm mr-[15px] items-center border rounded justify-center"
        >
          채팅방이동
        </button>
        <button onClick={handlePopup}>
          <Image
            className="w-8 h-8"
            src={close}
            width={30}
            height={30}
            alt="알림창 닫기 버튼"
          />
        </button>
      </div>
    </div>
  );
}

import Image from 'next/image';
import close from '/public/image/alarm/close.svg';
import chat from '/public/image/chat.svg';
import Link from 'next/link';

export default function AlarmHeader({ handlePopup }) {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-t-lg w-full h-[70px]">
      <div className="font-bold text-xl">알림</div>
      <div className="flex w-[120px] justify-between">
        <Link href="/chat" className="flex  items-center">
          <div className="text-sm">채팅방이동</div>
        </Link>
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

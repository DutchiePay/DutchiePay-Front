import Image from 'next/image';
import floating from '../../../../public/image/floating.svg';
import { useState } from 'react';

export default function Floating() {
  // 알림 상태를 관리
  const [hasNotification, setHasNotification] = useState(true); // true일 경우 빨간 점이 나타남

  return (
    <div className="fixed w-[50px] h-[50px]  right-[50px] bottom-[100px] drop-shadow-md z-2">
      <div className="relative rounded-full w-[70px] h-[70px] bg-blue--500 flex items-center justify-center cursor-pointer">
        <Image
          className=""
          src={floating}
          width={40}
          height={40}
          alt="Floating Button"
        />

        {hasNotification && (
          <div className="absolute top-[0px] right-[0px] w-[20px] h-[20px] bg-red--500 rounded-full border border-white"></div>
        )}
      </div>
    </div>
  );
}

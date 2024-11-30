import Image from 'next/image';
import { forwardRef } from 'react';
import prevNnext from '/public/image/prevNnext.svg';

const MainArrow = forwardRef(({ onClick, direction }, ref) => {
  return (
    <button
      ref={ref}
      className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <Image
        src={prevNnext}
        alt={`${direction} arrow`}
        width={18}
        height={18}
        className={`w-auto h-auto ${direction === 'next' ? 'rotate-180' : ''}`}
      />
    </button>
  );
});

export default MainArrow;

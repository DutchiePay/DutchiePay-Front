import Image from 'next/image';
import prevNnext from '/public/image/prevNnext.svg';

export default function MainArrow({ onClick, direction }) {
  return (
    <button
      className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
      onClick={onClick}
    >
      <Image
        src={prevNnext}
        alt={`${direction} arrow`}
        width={18}
        height={18}
        className={direction === 'next' ? 'rotate-180' : ''}
      />
    </button>
  );
}

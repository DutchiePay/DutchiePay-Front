import Image from 'next/image';
import MainArrow from './MainArrow';
import pause from '/public/image/pause.svg';
import play from '/public/image/play.svg';
import { useCallback } from 'react';

export default function MainCarouselInfo({
  isAutoPlay,
  setIsAutoPlay,
  sliderRef,
  currentSlide,
  handleNextClick,
  handlePrevClick,
}) {
  // 슬라이드 제어 함수
  const handleSlideAction = useCallback(
    (action) => {
      if (sliderRef.current) {
        sliderRef.current[action]();
      }
    },
    [sliderRef]
  );

  // 자동 재생 토글 함수
  const toggleAutoPlay = useCallback(() => {
    handleSlideAction(isAutoPlay ? 'slickPause' : 'slickPlay');
    setIsAutoPlay((prev) => !prev);
  }, [isAutoPlay, handleSlideAction, setIsAutoPlay]);

  return (
    <div className="absolute bottom-[24px] right-[40px] flex gap-[16px] items-center">
      <div className="w-[44px] h-[24px] bg-black/30 text-white text-xs flex justify-center items-center rounded-2xl">
        <strong>{currentSlide + 1}</strong>&nbsp;/&nbsp;2
      </div>
      <div className="flex gap-[16px]">
        <MainArrow direction="prev" onClick={handlePrevClick} />
        <button
          className="w-[44px] h-[44px] bg-black/30 rounded-full flex justify-center items-center"
          onClick={toggleAutoPlay}
        >
          {isAutoPlay ? (
            <Image
              className="w-auto h-auto"
              src={pause}
              alt="pause"
              width={35}
              height={30}
            />
          ) : (
            <Image
              className="w-auto h-auto"
              src={play}
              alt="play"
              width={20}
              height={20}
            />
          )}
        </button>
        <MainArrow direction="next" onClick={handleNextClick} />
      </div>
    </div>
  );
}

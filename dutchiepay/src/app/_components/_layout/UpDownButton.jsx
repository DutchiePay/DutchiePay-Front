import Image from 'next/image';
import updownArrow from '../../../../public/image/arrow/updownArrow.svg';
import { useState, useEffect } from 'react';

export default function UpDownButtons() {
  const [showButtons, setShowButtons] = useState(false); // 버튼의 표시 여부 상태

  // 스크롤 상태 감지
  useEffect(() => {
    const handleScrollCheck = () => {
      // 페이지 높이가 뷰포트 높이보다 클 때만 버튼 표시
      if (window.scrollY > 0) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener('scroll', handleScrollCheck);
    window.addEventListener('resize', handleScrollCheck); // 화면 크기 변경 시에도 체크

    // 초기 상태 체크
    handleScrollCheck();

    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
      window.removeEventListener('resize', handleScrollCheck);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 페이지 최상단으로 이동
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // 페이지 하단으로 이동
  };

  // 버튼이 보여야 할 때만 렌더링
  if (!showButtons) {
    return null;
  }

  return (
    <div className="fixed border shadow-lg right-[40px] bottom-[180px] flex flex-col gap-2">
      <div
        onClick={scrollToTop}
        className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
      >
        <Image
          className="rotate-180"
          src={updownArrow}
          width={30}
          height={30}
          alt="Up Arrow"
        />
      </div>
      <div
        onClick={scrollToBottom}
        className="relative w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
      >
        <Image src={updownArrow} width={30} height={30} alt="Down Arrow" />
      </div>
    </div>
  );
}

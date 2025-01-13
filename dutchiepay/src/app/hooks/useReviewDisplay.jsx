import { useEffect, useRef, useState } from 'react';

const useReviewDisplay = (thumbnails) => {
  const [hasImages, setHasImages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    // 리뷰 이미지가 있는 경우에만 hasImages를 true로 설정
    setHasImages(thumbnails.length > 0);
  }, [thumbnails]);

  const handleToggle = () => {
    setIsMore((prev) => !prev);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return {
    hasImages,
    isModalOpen,
    isMore,
    hasOverflow,
    contentRef,
    handleToggle,
    handleImageClick,
    handleCloseModal,
    setIsModalOpen,
  };
};

export default useReviewDisplay;

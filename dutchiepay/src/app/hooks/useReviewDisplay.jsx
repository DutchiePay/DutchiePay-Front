import { useEffect, useRef, useState } from 'react';

const useReviewDisplay = (thumbnails, content) => {
  const [hasImages, setHasImages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    setHasImages(thumbnails.length > 0);
  }, [thumbnails]);

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [content, isMore]);

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

  return {
    hasImages,
    isModalOpen,
    isMore,
    hasOverflow,
    contentRef,
    handleToggle,
    handleImageClick,
    handleCloseModal,
  };
};

export default useReviewDisplay;

import { useRef, useState } from 'react';

import Rating from '@/app/_components/_rating/Rating';

const RatingDragger = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const starWidth = rect.width / 5;
    const newRating = Math.ceil(offsetX / starWidth);

    setRating(Math.max(0, Math.min(5, newRating)));
    onRatingChange && onRatingChange(newRating);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const starWidth = rect.width / 5;
    const newRating = Math.ceil(offsetX / starWidth);

    setRating(Math.max(0, Math.min(5, newRating)));
    onRatingChange && onRatingChange(newRating);
  };

  return (
    <div
      className="inline-flex cursor-pointer"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <Rating rating={rating} size={40} />
    </div>
  );
};

export default RatingDragger;

export default function CarouselIndex({ end, activeSlide, handleSlideChange }) {
  return (
    <div className="absolute bottom-[10px] left-[930px]">
      <button
        onClick={() => handleSlideChange(0)}
        className={`px-[8px] mx-[8px] ${
          activeSlide === 0 ? 'border bg-blue-200 text-white rounded-full' : ''
        }`}
      >
        1
      </button>
      <button
        onClick={() => handleSlideChange(end)}
        className={`px-[8px] ${
          activeSlide === end
            ? 'border bg-blue-200 text-white rounded-full'
            : ''
        }`}
      >
        2
      </button>
    </div>
  );
}

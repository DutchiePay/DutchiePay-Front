import React from 'react';

const ReviewTextareaSection = ({ register }) => {
  return (
    <div className="flex flex-col">
      <strong className="text-blue--500 font-semibold">후기</strong>
      <textarea
        {...register('content')}
        className="h-[250px] mt-[4px] text-sm border border-blue--500 rounded-lg p-[12px] outline-none resize-none"
        placeholder="후기를 작성해주세요."
        spellCheck="false"
      />
    </div>
  );
};

export default ReviewTextareaSection;

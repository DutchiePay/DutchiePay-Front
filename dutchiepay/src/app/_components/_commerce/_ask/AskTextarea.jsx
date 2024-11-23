import React from 'react';

const AskTextarea = ({ register }) => {
  return (
    <textarea
      className="w-full h-[300px] mt-[8px] border border-blue--500 rounded p-[12px] resize-none product-ask-textarea outline-none"
      placeholder="문의 사항을 작성해주세요."
      {...register('content')}
    />
  );
};

export default AskTextarea;

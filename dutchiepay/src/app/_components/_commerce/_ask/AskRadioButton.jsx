import React from 'react';

const AskRadioButton = ({ register }) => {
  return (
    <div className="flex items-center gap-[8px] mt-[8px]">
      <p className="mr-[8px] text-blue--500 font-semibold">공개 설정</p>
      <input
        id="all"
        type="radio"
        value={false}
        defaultChecked
        {...register('isSecret')}
      />
      <label className="text-sm text-gray--500 mr-[8px]" htmlFor="all">
        전체 공개
      </label>
      <input id="secret" type="radio" value={true} {...register('isSecret')} />
      <label className="text-sm text-gray--500" htmlFor="secret">
        비공개
      </label>
    </div>
  );
};

export default AskRadioButton;

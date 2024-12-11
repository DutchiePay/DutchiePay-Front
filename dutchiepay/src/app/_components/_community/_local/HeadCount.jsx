export default function HeadCount({ register, setValue, watch }) {
  const headCount = watch('headCount', 2);

  const handleHeadCount = (operation) => {
    if (operation === '-') {
      if (headCount <= 2) {
        alert('본인을 포함 최소 2명이 필요합니다.');
        return;
      }
      setValue('headCount', headCount - 1);
    } else if (operation === '+') {
      if (headCount >= 10) {
        alert('최대 10명까지만 마트/배달에 참여할 수 있습니다.');
        return;
      }
      setValue('headCount', headCount + 1);
    }
  };

  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="max-number">
          최대 인원 수
        </label>
        <small className="text-sm text-gray--500">
          본인을 포함하여 마트/배달을 함께 할 최대 인원 수를 입력해주세요. 최대
          10명까지만 선택 가능합니다.
        </small>
      </div>
      <div className="w-full flex items-center gap-[4px] mb-[12px]">
        <button
          className="w-[25px] h-[25px] bg-blue--500 text-white font-bold rounded"
          value="-"
          onClick={() => handleHeadCount('-')}
          type="button"
        >
          -
        </button>
        <input
          id="max-number"
          className="border w-[32px] h-[32px] font-bold text-center"
          type="number"
          {...register('headCount', {
            value: 2,
            min: 2,
            max: 10,
            onChange: (e) => {
              const newValue = parseInt(e.target.value, 10);
              if (newValue >= 2 && newValue <= 10) {
                setValue('headCount', newValue);
              } else {
                alert('최소 2명, 최대 10명까지만 가능합니다.');
                setValue('headCount', headCount);
              }
            },
          })}
          aria-required="true"
        />
        <button
          className="w-[25px] h-[25px] bg-blue--500 text-white font-bold rounded"
          value="+"
          onClick={() => handleHeadCount('+')}
          type="button"
        >
          +
        </button>
      </div>
    </>
  );
}

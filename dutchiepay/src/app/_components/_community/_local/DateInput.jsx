export default function DateInput({ register, setValue }) {
  const handleDateTimeChange = () => {
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;

    if (dateInput && timeInput) {
      const date = new Date(`${dateInput}T${timeInput}`);
      const options = {
        year: undefined,
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const formatted = date.toLocaleString('ko-KR', options);

      setValue('formattedDateTime', formatted);
    }
  };

  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="date">
          일시
        </label>
        <small className="text-sm text-gray--500">
          희망하는 날짜와 시간을 입력해주세요.
        </small>
      </div>
      <div className="flex gap-[8px]">
        <input
          id="date"
          className="w-[150px] border rounded-lg outline-none px-[12px] py-[8px] text-sm"
          type="date"
          {...register('date', { onChange: handleDateTimeChange })}
        />
        <input
          id="time"
          className="w-[150px] border rounded-lg outline-none px-[12px] py-[8px] text-sm"
          type="time"
          {...register('time', { onChange: handleDateTimeChange })}
        />
      </div>
    </>
  );
}

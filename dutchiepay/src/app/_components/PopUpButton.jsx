import '@/styles/globals.css';

export default function PopUpButton({ submitText }) {
  const closeWindow = () => {
    window.close();
  };

  return (
    <div className="flex justify-center gap-[24px] mt-[24px]">
      <button
        className="text-red-500 text-sm bg-red--100 rounded-lg px-[24px] py-[8px]"
        type="submit"
      >
        {submitText}
      </button>
      <button
        className="text-blue--500 text-sm border border-blue--200 rounded-lg px-[24px] py-[8px]"
        type="button"
        onClick={closeWindow}
      >
        취소
      </button>
    </div>
  );
}

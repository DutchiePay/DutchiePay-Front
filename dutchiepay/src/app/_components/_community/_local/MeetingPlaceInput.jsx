export default function MettingPlaceInput({ setIsModalOpen, watch }) {
  const locationDescription = watch('locationDescription');
  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="trading-place">
          거래 장소
        </label>
        <small className="text-sm text-gray--500">
          거래를 진행할 장소입니다.
        </small>
        <button
          className="text-sm text-blue-500 font-bold hover:underline"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          거래위치변경
        </button>
      </div>
      <input
        className="w-[600px] border rounded-lg outline-none py-[8px] px-[12px] placeholder:text-sm"
        type="text"
        value={locationDescription || ''}
        placeholder="거래 장소"
        disabled={true}
      />
    </>
  );
}

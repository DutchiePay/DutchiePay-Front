export default function CahtListHeader() {
  return (
    <>
      <div className="w-[480px] h-[50px] p-3 items-center text-lg font-bold border-b cursor-pointer mb-[16px]">
        채팅
      </div>
      <div className="flex items-center justify-between text-xs  w-[380px] pl-3 py-2">
        <div className="flex justify-between gap-[10px] text-gray--500">
          <div className={`cursor-pointer 'text-black' hover:text-black`}>
            전체
          </div>

          <div className="after:content-['|']"></div>
          <div className={`cursor-pointer 'text-black' hover:text-black`}>
            개인
          </div>
          <div className="after:content-['|']"></div>
          <div className={`cursor-pointer 'text-black' hover:text-black`}>
            단체
          </div>
        </div>
      </div>
    </>
  );
}

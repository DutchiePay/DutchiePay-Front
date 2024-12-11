'use client';

import CurrentMap from './CurrentMap';

export default function LocationModal({
  setIsModalOpen,
  register,
  setValue,
  watch,
}) {
  const locationDescription = watch('locationDescription');
  const handleLocation = () => {
    if (!locationDescription.trim()) {
      alert('위치에 대한 설명을 입력해주세요.');
      return;
    }
    setIsModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40">
      <article className="absolute top-[20%] left-[33%] bg-white w-[600px] p-[32px] rounded-lg border b-black m-0 m-auto z-50">
        <h1 className="text-3xl font-bold">거래 진행 위치 설정</h1>
        <p className="text-xs mt-[4px]">
          거래를 원하는 위치를 클릭하시면 마크가 이동합니다.
        </p>
        <p className="text-xs text-gray--500 mt-[12px]">
          ※ 추천 거래 진행 위치
          <br />
          마트의 경우 - 구매를 진행할 마트 위치 등<br />
          배달의 경우 - 배달 시킨 음식을 나눌 장소, 배달 시킬 장소 등<br />
        </p>

        <div className="w-full mt-[24px]">
          <CurrentMap setValue={setValue} watch={watch} />
          <div className="flex flex-col items-center">
            <input
              className="w-full mt-[20px] text-sm border p-[12px] outline-none resize-none rounded"
              type="text"
              placeholder="해당 위치 이름 또는 설명을 적어주세요. (ex) 삼각지역 1번출구)"
              {...register('locationDescription')}
            />

            <button
              className="w-[170px] text-white text-sm bg-blue-500 rounded-lg px-[24px] py-[8px] mt-[12px]"
              onClick={handleLocation}
            >
              위치 설정
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

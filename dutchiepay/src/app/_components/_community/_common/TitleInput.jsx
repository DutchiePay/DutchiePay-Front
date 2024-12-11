export default function TitleInput({ register }) {
  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="title">
          제목
        </label>
        <small className="text-sm text-gray--500">
          게시글 제목을 입력해주세요. 최대 60글자까지 입력 가능합니다.
        </small>
      </div>
      <input
        id="title"
        className="w-[600px] border rounded-lg outline-none py-[8px] px-[12px] placeholder:text-sm"
        type="text"
        placeholder="게시글 제목"
        aria-required="true"
        {...register('title')}
      />
    </>
  );
}

export default function CommunityFilter({ categories, filter, setFilter }) {
  return (
    <>
      <div className="flex items-center gap-[12px] mt-[24px] mb-[8px]">
        <label className="font-bold text-lg" htmlFor="category">
          카테고리
        </label>
        <small className="text-sm text-gray--500">
          작성하실 게시글의 카테고리를 선택해주세요.
        </small>
      </div>
      <ul className="flex gap-[16px]">
        {categories.map((value, key) => {
          return (
            <li key={key}>
              <button
                className={`py-[6px] px-[16px] text-blue--500 text-sm border border-blue--500 rounded-2xl transition-all duration-300 ease-in-out ${filter === value ? 'bg-blue--500 text-white' : ''}`}
                onClick={() => setFilter(value)}
                type="button"
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
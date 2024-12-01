export default function OrderFilter({
  hasFetched,
  filter,
  setFilter,
  setPage,
  setIsEnd,
}) {
  const handleFilter = (e) => {
    hasFetched.current = false;
    setFilter(e.target.innerText);
    setPage(1);
    setIsEnd(false);
  };

  return (
    <ul className="flex gap-[8px] my-[16px]">
      <li>
        <button
          className={`py-[6px] px-[12px] text-blue--500 text-sm border border-blue--500 rounded-2xl transition-all duration-300 ease-in-out ${filter === '전체' ? `text-white bg-blue--500` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          전체
        </button>
      </li>
      {['배송전', '배송중', '배송완료'].map((value, key) => (
        <li key={key}>
          <button
            className={`py-[6px] px-[12px] text-blue--500 text-sm border border-blue--500 rounded-2xl transition-all duration-300 ease-in-out ${filter === value ? `text-white bg-blue--500` : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}

import '@/styles/globals.css';
import '@/styles/mypage.css';

export default function OrderFilter({ filter, setFilter, setPage, setIsEnd }) {
  const handleFilter = (e) => {
    setFilter(e.target.innerText);
    setPage(1);
    setIsEnd(false);
  };

  return (
    <ul className="flex gap-[8px] my-[16px]">
      <li>
        <button
          className={`mypage__filter ${filter === '전체' ? `mypage__filter--selected` : ''}`}
          onClick={(e) => handleFilter(e)}
        >
          전체
        </button>
      </li>
      {['배송전', '배송중', '배송완료'].map((value, key) => (
        <li key={key}>
          <button
            className={`mypage__filter ${filter === value ? `mypage__filter--selected` : ''}`}
            onClick={(e) => handleFilter(e)}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}

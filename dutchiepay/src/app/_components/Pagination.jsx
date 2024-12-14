import React from 'react';

const Pagination = ({
  activePage,
  totalItems,
  limit,
  onPageChange,
  mypost,
}) => {
  const totalPageCount = Math.ceil(totalItems / limit); // 총 페이지 수 계산
  const pageRangeDisplayed = 5; // 보여줄 페이지 수

  // 페이지 그룹 계산
  const calculatePageRange = () => {
    const range = [];
    const start =
      Math.floor((activePage - 1) / pageRangeDisplayed) * pageRangeDisplayed +
      1;
    const end = Math.min(start + pageRangeDisplayed - 1, totalPageCount);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = calculatePageRange();

  return (
    <div
      className={`flex justify-center mt-4 w-[1020px] ${mypost ? 'w-[720px]' : 'w-[1020px]'}`}
    >
      {/* 이전 버튼 */}
      <button
        onClick={() => onPageChange(Math.max(activePage - 1, 1))}
        className={`mx-4 px-3 py-1 border rounded border-gray--300 ${activePage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`}
        disabled={activePage === 1}
      >
        &lt;
      </button>

      {/* 페이지 번호 렌더링 */}
      {pageRange.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-4 px-2
            ${activePage === page ? ' text-blue--500 text-[24px]' : 'text-gray-500 '}`}
        >
          {page}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onPageChange(Math.min(activePage + 1, totalPageCount))}
        className={`mx-4 px-3 py-1 border rounded border-gray--300 ${activePage === totalPageCount ? 'opacity-50 cursor-not-allowed' : 'text-gray-500 hover:bg-blue-500 hover:text-white'}`}
        disabled={activePage === totalPageCount}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

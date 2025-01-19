import Image from 'next/image';
import { useState } from 'react';
import arrow from '/public/image/chat/arrow.svg';

export default function ChatListHeader({ setFilterType }) {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('전체');

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
    setCurrentFilter(
      filter === 'direct' ? '개인' : filter === 'group' ? '단체' : '전체'
    );
    setFiltersVisible(false);
  };

  return (
    <>
      <div className="relative w-[480px] gap-[10px] h-[70px] p-3 items-center flex text-lg font-bold border-b cursor-pointer">
        <div>{currentFilter}</div>
        <Image
          src={arrow}
          alt="화살표"
          className="relative"
          onClick={toggleFilters}
        />
      </div>
      <div
        className={`absolute left-6 w-[100px] overflow-hidden ${isFiltersVisible ? 'border border-gray-300 z-[10]' : 'h-0'}`}
      >
        <div className="text-sm text-center bg-white shadow-md p-2">
          <div
            className="cursor-pointer text-gray--500 hover:text-black p-2"
            onClick={() => handleFilterChange('all')}
          >
            전체
          </div>
          <div
            className="cursor-pointer text-gray--500 hover:text-black p-2 border-t"
            onClick={() => handleFilterChange('direct')}
          >
            개인
          </div>
          <div
            className="cursor-pointer text-gray--500 hover:text-black p-2 border-t"
            onClick={() => handleFilterChange('group')}
          >
            단체
          </div>
        </div>
      </div>
    </>
  );
}

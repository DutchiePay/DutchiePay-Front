'use client';

import Image from 'next/image';
import WordStore from './WordStore';
import close from '/public/image/deleteClose.svg';
import { useEffect } from 'react';

export default function CurrentSearch({
  isSearchStoreEnabled,
  setIsSearchStoreEnabled,
  focusedIndex,
  setFocusedIndex,
  setSearchHistory,
  searchHistory,
  handleSearch,
}) {
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, [setSearchHistory]);

  const removeSearchTerm = (term) => {
    const updatedHistory = searchHistory.filter((item) => item !== term);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="absolute bg-white w-[500px] border rounded-b-lg">
      <p className="mt-[12px] px-[24px] text-lg text-blue--500 font-bold">
        최근 검색어
      </p>
      <ul className="flex flex-col h-[200px] mt-[12px]">
        {searchHistory.length > 0 ? (
          searchHistory.slice(0, 6).map((term, index) => (
            <li
              key={index}
              className={`flex justify-between items-center cursor-pointer py-[4px] px-[24px] ${focusedIndex === index ? 'bg-gray--100' : ''}`}
              onClick={() => handleSearch(term)}
              onMouseEnter={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(-1)}
            >
              <p>{term}</p>
              <button onClick={() => removeSearchTerm(term)}>
                <Image src={close} alt="close" width={20} height={20} />
              </button>
            </li>
          ))
        ) : (
          <p className="text-center my-auto text-gray--500 text-sm px-[24px]">
            최근 검색어가 없습니다.
          </p>
        )}
      </ul>
      <div className="text-xs text-gray--500 flex gap-[24px] px-[24px] mb-[12px]">
        <button onClick={clearSearchHistory}>전체 삭제</button>
        <WordStore
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
        />
      </div>
    </div>
  );
}

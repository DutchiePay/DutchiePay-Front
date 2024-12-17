'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import WordStore from './WordStore';
import close from '/public/image/deleteClose.svg';

export default function CurrentSearch({
  isSearchStoreEnabled,
  setIsSearchStoreEnabled,
}) {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

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
    <div className="absolute bg-white w-[500px] border py-[16px] px-[24px] rounded-b-lg">
      <p className="text-lg text-blue--500 font-bold">최근 검색어</p>
      <ul className="flex flex-col gap-[8px] h-[200px] mt-[12px]">
        {searchHistory.length > 0 ? (
          searchHistory.slice(0, 6).map((term, index) => (
            <li
              key={index}
              className="flex justify-between items-center cursor-pointer"
            >
              <p>{term}</p>
              <button onClick={() => removeSearchTerm(term)}>
                <Image src={close} alt="close" width={20} height={20} />
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray--500 text-sm">최근 검색어가 없습니다.</p>
        )}
      </ul>
      <div className="text-xs text-gray--500 flex gap-[24px]">
        <button onClick={clearSearchHistory}>전체 삭제</button>
        <WordStore
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
        />
      </div>
    </div>
  );
}

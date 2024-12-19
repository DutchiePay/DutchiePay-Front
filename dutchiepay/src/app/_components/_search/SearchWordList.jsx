'use client';

import Image from 'next/image';
import WordStore from './WordStore';
import link from '/public/image/link.svg';

export default function SearchWordList({
  setIsSearchStoreEnabled,
  isSearchStoreEnabled,
  filteredList,
  focusedIndex,
  setFocusedIndex,
  handleSearch,
}) {
  return (
    <div className="absolute bg-white w-[500px] border rounded-b-lg">
      <ul className="flex flex-col h-[200px] mt-[12px]">
        {filteredList.map((word, key) => (
          <li
            key={key}
            className={`flex justify-between items-center cursor-pointer py-[4px] px-[24px] ${focusedIndex === key ? 'bg-gray--100' : ''}`}
            onClick={() => handleSearch(word)}
            onMouseEnter={() => setFocusedIndex(key)}
            onMouseLeave={() => setFocusedIndex(-1)}
          >
            <p>{word}</p>
            <button>
              <Image src={link} alt="link" width={13} height={13} />
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-[12px] px-[24px]">
        <WordStore
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
        />
      </div>
    </div>
  );
}

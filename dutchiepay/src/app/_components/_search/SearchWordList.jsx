'use client';

import Image from 'next/image';
import WordStore from './WordStore';
import link from '/public/image/link.svg';

export default function SearchWordList({
  setIsSearchStoreEnabled,
  isSearchStoreEnabled,
}) {
  return (
    <div className="absolute bg-white w-[500px] border py-[16px] px-[18px] rounded-b-lg">
      <ul className="flex flex-col gap-[8px] h-[200px] mt-[12px]">
        <li className="flex justify-between items-center cursor-pointer">
          <p>검색어1</p>
          <button>
            <Image src={link} alt="link" width={13} height={13} />
          </button>
        </li>
      </ul>
      <WordStore
        isSearchStoreEnabled={isSearchStoreEnabled}
        setIsSearchStoreEnabled={setIsSearchStoreEnabled}
      />
    </div>
  );
}

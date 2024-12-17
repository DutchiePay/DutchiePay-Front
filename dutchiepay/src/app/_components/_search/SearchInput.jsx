'use client';

import { useEffect, useRef, useState } from 'react';

import CurrentSearch from './CurrentSearch';
import Image from 'next/image';
import SearchWordList from './SearchWordList';
import axios from 'axios';
import search from '/public/image/search.svg';

export default function SearchInput({ keyword, setKeyword }) {
  const [searchWord, setSearchWord] = useState(keyword);
  const [wordList, setWordList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchStoreEnabled, setIsSearchStoreEnabled] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const storedValue = JSON.parse(
      localStorage.getItem('isSearchStoreEnabled')
    );
    if (storedValue !== null) {
      setIsSearchStoreEnabled(storedValue);
    }
  }, []);

  const getSearchDic = async () => {
    setIsFocus(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/search`
      );
      setWordList(response.data.tags);
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleSearch = (word) => {
    if (!word.trim()) return;
    setKeyword(word);

    if (isSearchStoreEnabled) {
      const searchHistory =
        JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!searchHistory.includes(word)) {
        const updatedHistory = [...searchHistory, word];
        localStorage.setItem(
          'searchHistory',
          JSON.stringify(updatedHistory.reverse())
        );
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchWord);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef}>
      <div className="relative">
        <Image
          className="absolute pt-[14px] pb-[13px] ml-[20px]"
          src={search}
          width={20}
          height={20}
          alt="search"
        />
        <input
          className="w-[500px] border-b-2 border-black pt-[13px] pb-[13px] pl-[52px] outline-none"
          placeholder="찾으시는 상품을 입력해주세요"
          value={searchWord || ''}
          onChange={(e) => setSearchWord(e.target.value)}
          onClick={() => getSearchDic()}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isFocus && !searchWord && (
        <CurrentSearch
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
        />
      )}
      {isFocus && searchWord && (
        <SearchWordList
          wordList={wordList}
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
        />
      )}
    </div>
  );
}

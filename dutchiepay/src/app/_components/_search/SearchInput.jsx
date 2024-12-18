'use client';

import { useEffect, useRef, useState } from 'react';

import CurrentSearch from './CurrentSearch';
import Image from 'next/image';
import SearchWordList from './SearchWordList';
import axios from 'axios';
import deleteIcon from '/public/image/delete.svg';
import search from '/public/image/search.svg';

export default function SearchInput({ keyword, setKeyword }) {
  const [searchWord, setSearchWord] = useState(keyword);
  const [wordList, setWordList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchStoreEnabled, setIsSearchStoreEnabled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  const divRef = useRef(null);
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
    setSearchWord(word);

    if (isSearchStoreEnabled) {
      const searchHistory =
        JSON.parse(localStorage.getItem('searchHistory')) || [];
      const filteredHistory = searchHistory.filter((item) => item !== word);
      const updatedHistory = [word, ...filteredHistory];
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
    setIsFocus(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0) {
        if (searchWord && wordList[focusedIndex]) {
          handleSearch(wordList[focusedIndex]);
        } else {
          setSearchWord(searchHistory[focusedIndex]);
          handleSearch(searchHistory[focusedIndex]);
        }
        setFocusedIndex(-1);
      } else {
        handleSearch(searchWord);
      }
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        Math.min(
          prev + 1,
          searchWord ? wordList.length - 1 : searchHistory.length - 1
        )
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, -1));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsFocus(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef}>
      <div className="relative">
        <Image
          className="absolute top-[14px] left-[20px]"
          src={search}
          width={20}
          height={20}
          alt="search"
        />
        {searchWord && (
          <Image
            className="absolute right-[12px] top-[15px]"
            src={deleteIcon}
            width={25}
            height={25}
            alt="delete"
            onClick={() => setSearchWord('')}
          />
        )}
        <input
          ref={inputRef}
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
          focusedIndex={focusedIndex}
          setSearchHistory={setSearchHistory}
          searchHistory={searchHistory}
          handleSearch={handleSearch}
          setFocusedIndex={setFocusedIndex}
        />
      )}
      {isFocus && searchWord && (
        <SearchWordList
          wordList={wordList}
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
          focusedIndex={focusedIndex}
        />
      )}
    </div>
  );
}

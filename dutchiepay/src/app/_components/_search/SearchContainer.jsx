'use client';

import { useEffect, useRef, useState } from 'react';

import CurrentSearch from './CurrentSearch';
import SearchInput from './SearchInput';
import SearchWordList from './SearchWordList';

export default function SearchContainer({ keyword, setKeyword }) {
  const [searchWord, setSearchWord] = useState(keyword);
  const [wordList, setWordList] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchStoreEnabled, setIsSearchStoreEnabled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    const storedValue = JSON.parse(
      localStorage.getItem('isSearchStoreEnabled')
    );
    if (storedValue !== null) {
      setIsSearchStoreEnabled(storedValue);
    }
  }, []);

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
    <div ref={divRef} className="z-20">
      <SearchInput
        setIsFocus={setIsFocus}
        searchHistory={searchHistory}
        handleSearch={handleSearch}
        wordList={wordList}
        setWordList={setWordList}
        filteredList={filteredList}
        setFilteredList={setFilteredList}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
      />
      {isFocus && !searchWord ? (
        <CurrentSearch
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
          focusedIndex={focusedIndex}
          setSearchHistory={setSearchHistory}
          searchHistory={searchHistory}
          handleSearch={handleSearch}
          setFocusedIndex={setFocusedIndex}
        />
      ) : isFocus && searchWord ? (
        <SearchWordList
          filteredList={filteredList}
          isSearchStoreEnabled={isSearchStoreEnabled}
          setIsSearchStoreEnabled={setIsSearchStoreEnabled}
          focusedIndex={focusedIndex}
          setFocusedIndex={setFocusedIndex}
          handleSearch={handleSearch}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

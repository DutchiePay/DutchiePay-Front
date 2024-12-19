'use client';

import * as Hangul from 'hangul-js';

import Image from 'next/image';
import axios from 'axios';
import deleteIcon from '/public/image/delete.svg';
import search from '/public/image/search.svg';
import { useRef } from 'react';

export default function SearchInput({
  setIsFocus,
  searchHistory,
  handleSearch,
  wordList,
  setWordList,
  filteredList,
  setFilteredList,
  searchWord,
  setSearchWord,
  focusedIndex,
  setFocusedIndex,
}) {
  const inputRef = useRef(null);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0) {
        if (searchWord && filteredList[focusedIndex]) {
          handleSearch(filteredList[focusedIndex]);
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
          searchWord ? filteredList.length - 1 : searchHistory.length - 1
        )
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, -1));
    }
  };

  const handleWordSearch = (e) => {
    let word = e.target.value;
    setSearchWord(word);
    const searcher = new Hangul.Searcher(word);
    const filteredWords = wordList.filter((decomposedTag) => {
      return searcher.search(decomposedTag) === 0;
    });

    setFilteredList(filteredWords.slice(0, 6));
  };

  return (
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
        onChange={(e) => handleWordSearch(e)}
        onClick={() => getSearchDic()}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

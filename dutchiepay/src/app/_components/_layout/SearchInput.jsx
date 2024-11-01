'use client';

import '@/styles/globals.css';
import '@/styles/commerce.css';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import search from '/public/image/search.svg';

export default function SearchInput() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        router.push(`/search?keyword=${encodeURIComponent(e.target.value)}`);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      setKeyword('');
    }
  }, [pathname]);

  return (
    <div className="relative">
      <Image
        className="absolute pt-[13px] pb-[13px] ml-[20px]"
        src={search}
        width={16}
        height={16}
        alt="search"
      />
      <input
        className="w-[600px] h-[42px] bg-gray--100 pt-[13px] pb-[13px] pl-[52px] border rounded-md outline-none placeholder:text-[14px]"
        placeholder="검색어를 입력해주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

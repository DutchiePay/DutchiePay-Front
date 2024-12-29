import Image from 'next/image';
import search from '/public/image/search.svg';

export default function PostSearch({ setKeyword }) {
  return (
    <div className="relative">
      <input
        className="w-[300px] border pl-[32px] pr-[4px] py-[8px] text-sm outline-none"
        placeholder="게시글 제목으로 검색"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Image
        className="absolute top-[11px] left-[10px]"
        src={search}
        alt="search"
        width={15}
        height={15}
      />
    </div>
  );
}

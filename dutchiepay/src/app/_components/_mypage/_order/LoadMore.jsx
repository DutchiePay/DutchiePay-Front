import Image from 'next/image';
import arrow from '/public/image/arrow.svg';

export default function LoadMore({ isEnd, setPage, hasFetched }) {
  const handleLoadMore = () => {
    hasFetched.current = false;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {!isEnd && (
        <button
          className="w-[250px] rounded flex justify-between items-center px-[24px] py-[8px] border mx-auto mt-[60px] mb-[40px]"
          onClick={handleLoadMore}
        >
          구매내역 더 불러오기
          <Image
            className="w-[20px] h-[20px]"
            src={arrow}
            alt="arrow"
            width={20}
            height={20}
          />
        </button>
      )}
    </>
  );
}

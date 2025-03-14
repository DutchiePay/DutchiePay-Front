import { useCallback, useEffect, useState } from 'react';

import AskItem from '@/app/_components/_commerce/_ask/AskItem';
import Image from 'next/image';
import Pagination from '@/app/_components/Pagination';
import ask from '/public/image/nonItem/ask.svg';
import axios from 'axios';

export default function Ask({ askCount, productId, company }) {
  const openPopup = (url) => {
    window.open(url, '_blank', 'width=620, height=670');
  };

  const buyId = productId; // 게시글 정보 저장 시 변경 예정
  const [items, setItems] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fetchItems = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commerce/asks?buyId=${buyId}&page=${page}&limit=6`
        );

        setItems(response.data);
        setTotalItems(askCount || 0);
      } catch (error) {
        alert('데이터를 가져오는 데 오류가 발생했습니다:');
      }
    },
    [buyId, askCount]
  );

  useEffect(() => {
    fetchItems(activePage);
  }, [activePage, fetchItems]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    fetchItems(activePage);
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data && event.data.type === 'REFRESH_ASK') {
        fetchItems(activePage);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [activePage, fetchItems]);

  const handleDeleteAsk = (askId) => {
    setItems((prevAsks) => prevAsks.filter((ask) => ask.askId !== askId));
  };

  return (
    <>
      <button
        className="w-[140px] mt-[12px] text-white rounded bg-blue-500 px-[16px] py-[8px] text-sm"
        onClick={() => openPopup(`/ask?buyId=${buyId}`)}
      >
        상품 문의 작성하기
      </button>
      <table className="w-full mt-[8px] text-[14px] mb-[60px]">
        <tbody>
          <tr className="border-t border-t-blue--500 border-t-2 border-b-2 border-gray-300 text-center">
            <th className="w-[100px] px-[12px] py-[10px] border-gray-300">
              답변상태
            </th>
            <th className="w-[500px] px-[12px] py-[10px]">문의내용</th>
            <th className="w-[150px] px-[12px] py-[10px] border-gray-300">
              작성자
            </th>
            <th className="w-[150px] px-[12px] py-[10px]">작성일</th>
            <th className="w-[100px] px-[12px] py-[10px] border-gray-300">
              삭제
            </th>
          </tr>
          {items.length === 0 ? (
            <tr className=" mb-[32px] w-[500px] min-h-[140px]">
              <td colSpan="5" className=" mt-[50px] text-center py-4">
                <Image
                  src={ask}
                  alt="문의 내용 없음"
                  width={40}
                  height={40}
                  className="pt-[32px] mx-auto"
                />
                <p className="my-[40px]">등록된 문의내용이 없습니다.</p>
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <AskItem
                key={`${activePage}-${index}`}
                item={item}
                company={company}
                onDelete={handleDeleteAsk}
              />
            ))
          )}
        </tbody>
      </table>
      {totalItems > 0 && (
        <Pagination
          activePage={activePage}
          totalItems={totalItems}
          limit={6}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

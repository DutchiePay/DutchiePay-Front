import '@/styles/commerce.css';
import '@/styles/globals.css';

import AskItem from './AskItem';

export default function Ask() {
  const askPopup = () => {
    window.open('/ask', '_blank', 'width=620, height=670');
  };

  return (
    <>
      <button
        className="w-[140px] mt-[12px] text-white rounded bg-blue-500 px-[16px] py-[8px] text-sm"
        onClick={askPopup}
      >
        상품 문의 작성하기
      </button>
      <table className="w-full mt-[8px] text-[14px] mb-[100px]">
        <tbody>
          <tr className="border-t border-t-blue--500 border-t-2  border-b-2  border-gray-300 text-center">
            <th className="w-[100px] px-[12px] py-[10px]  border-gray-300">
              답변상태
            </th>
            <th className="w-[500px] px-[12px] py-[10px]">문의내용</th>
            <th className=" w-[150px] px-[12px] py-[10px]  border-gray-300">
              작성자
            </th>
            <th className="w-[150px] px-[12px] py-[10px]">작성일</th>
            <th className=" w-[100px] px-[12px] py-[10px]  border-gray-300">
              삭제
            </th>
          </tr>
          <AskItem />
          <AskItem />
          <AskItem />
          <AskItem />
          <AskItem />
          <AskItem />
          <AskItem />
        </tbody>
      </table>
    </>
  );
}
